import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sections } from './backend/data/sections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  
const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
const allowedOrigins = [
    'https://chatbot-ggu-8gy1.vercel.app',
    'https://chatbot-ggu-wz45.vercel.app',
    'http://localhost:3000',
    'http://localhost:5000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());

// Pre-flight requests handling
app.options('*', cors());

// Set security headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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
        
        // Add media content if available
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

// Vercel's handler export
export default app;

// Start server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
