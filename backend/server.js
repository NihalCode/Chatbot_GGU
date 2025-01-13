import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sections } from './backend/data/sections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  
const app = express();
const PORT = process.env.PORT || 3000;

// Updated allowed origins to include all relevant domains
const allowedOrigins = [
    'https://chatbot-ggu-7ubt.vercel.app',  // Added the domain from the error
    'https://chatbot-ggu-8gy1.vercel.app',
    'https://chatbot-ggu-wz45.vercel.app',
    'http://localhost:3000',
    'http://localhost:5000'
];

// Consolidated CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin is in our allowedOrigins array
        if (allowedOrigins.includes(origin)) {
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

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Remove the redundant CORS headers middleware since we're using the cors package
app.use(express.json());

// Pre-flight requests handling
app.options('*', cors(corsOptions));

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// API routes
app.get('/questions/:section', async (req, res) => {
    try {
        console.log('Received request for section:', req.params.section);
        const { section } = req.params;
        
        if (!sections[section]) {
            return res.status(400).json({ 
                error: 'Invalid section. Available sections: academics, finance, faq' 
            });
        }
        res.json({ questions: sections[section].questions });
    } catch (error) {
        console.error('Error handling questions request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/chat', async (req, res) => {
    try {
        const { section, questionNumber } = req.body;
        if (!section || questionNumber === undefined) {
            return res.status(400).json({ 
                error: 'Missing required parameters: section and questionNumber' 
            });
        }
        
        if (!sections[section] || !sections[section].responses[questionNumber]) {
            return res.status(400).json({ 
                error: 'Invalid section or question number' 
            });
        }
        
        const response = {
            response: sections[section].responses[questionNumber]
        };
        
        if (sections[section].media?.[questionNumber]) {
            const { type, content } = sections[section].media[questionNumber];
            response[type] = content;
        }
        
        res.json(response);
    } catch (error) {
        console.error('Error handling chat request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
