import express from 'express';
import cors from 'cors';
import { sections } from './data/sections.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get questions for a specific section
app.get('/questions/:section', (req, res) => {
  const { section } = req.params;

  if (!sections[section]) {
    return res.status(400).json({ 
      error: 'Invalid section. Available sections: academics, finance, faq' 
    });
  }

  res.json({ questions: sections[section].questions });
});

// Get response for a specific question
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

  res.json({ 
    response: sections[section].responses[questionNumber]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
