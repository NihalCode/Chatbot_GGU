import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sections } from './data/sections.js';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Add your frontend URL here
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Serve static files from the parent directory
app.use(express.static(join(__dirname, '../')));

// Debug logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Get questions for a specific section
app.get('/questions/:section', (req, res) => {
    console.log('Received request for section:', req.params.section);
    const { section } = req.params;
    
    if (!sections[section]) {
        return res.status(400).json({ 
            error: 'Invalid section. Available sections: academics, finance, faq' 
        });
    }
    
    console.log('Sending questions for section:', section);
    res.json({ questions: sections[section].questions });
});

// Get response for a specific question
app.post('/chat', (req, res) => {
    console.log('Received chat request:', req.body);
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
    
    // Get response and media content if available
    const response = {
        response: sections[section].responses[questionNumber]
    };

    // Add media content if available
    if (sections[section].media?.[questionNumber]) {
        const { type, content } = sections[section].media[questionNumber];
        response[type] = content;
    }

    console.log('Sending response:', response);
    res.json(response);
});

// Handle root path
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server directory: ${__dirname}`);
});
