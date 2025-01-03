import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sections } from './backend/data/sections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files - adjust the path to point to your frontend directory
app.use(express.static(join(__dirname, '../src'))); // This will serve files from the parent directory

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../src/index.html'));
});

// API routes
app.get('/questions/:section', (req, res) => {
    console.log('Received request for section:', req.params.section);
    const { section } = req.params;
    
    if (!sections[section]) {
        return res.status(400).json({ 
            error: 'Invalid section. Available sections: academics, finance, faq' 
        });
    }
    res.json({ questions: sections[section].questions });
});

app.post('/chat', (req, res) => {
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
});

// Vercel's handler export
export default app;
