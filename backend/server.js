import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sections } from './backend/data/sections.js';

// ES Module fixes for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security configurations
const allowedOrigins = [
    'https://chatbot-ggu-7ubt.vercel.app',
    'https://chatbot-ggu-8gy1.vercel.app',
    'https://chatbot-ggu-wz45.vercel.app',
    'http://localhost:3000',
    'http://localhost:5000'
];

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true,
    optionsSuccessStatus: 204
};

// Middleware
app.use(helmet()); // Security headers
app.use(cors(corsOptions));
app.use(express.json()); // Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // Logging
app.use(limiter); // Rate limiting

// Pre-flight requests
app.options('*', cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Input validation middleware
const validateSection = (req, res, next) => {
    const validSections = Object.keys(sections);
    const { section } = req.params;
    
    if (!validSections.includes(section)) {
        return res.status(400).json({
            error: `Invalid section. Available sections: ${validSections.join(', ')}`
        });
    }
    next();
};

// API Routes
app.get('/questions/:section', validateSection, async (req, res) => {
    try {
        const { section } = req.params;
        res.json({ 
            success: true,
            data: {
                questions: sections[section].questions
            }
        });
    } catch (error) {
        console.error('Error in /questions/:section:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
});

app.post('/chat', async (req, res) => {
    try {
        const { section, questionNumber } = req.body;

        // Input validation
        if (!section || questionNumber === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters: section and questionNumber'
            });
        }

        if (!sections[section] || !sections[section].responses[questionNumber]) {
            return res.status(400).json({
                success: false,
                error: 'Invalid section or question number'
            });
        }

        const response = {
            success: true,
            data: {
                response: sections[section].responses[questionNumber]
            }
        };

        // Add media content if available
        if (sections[section].media?.[questionNumber]) {
            const { type, content } = sections[section].media[questionNumber];
            response.data[type] = content;
        }

        res.json(response);
    } catch (error) {
        console.error('Error in /chat:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Resource not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    
    // Handle CORS errors specifically
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            error: 'CORS error: Origin not allowed'
        });
    }
    
    // General error response
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Performing graceful shutdown...');
    // Close any database connections or cleanup here if needed
    process.exit(0);
});

// Vercel's handler export
export default app;

// Start server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle server errors
    server.on('error', (error) => {
        console.error('Server error:', error);
        process.exit(1);
    });
}
