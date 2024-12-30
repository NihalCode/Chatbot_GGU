import express from 'express';
import cors from 'cors';
import { questions } from './data/questions.js';
import { responses } from './data/responses.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get questions for a specific section
app.get('/questions/:section', (req, res) => {
  const { section } = req.params;
  
  if (!questions[section]) {
    return res.status(400).json({ 
      error: 'Invalid section. Available sections: academics, finance, faq' 
    });
  }

  res.json({ questions: questions[section] });
});

// Get response for a specific question
app.post('/chat', (req, res) => {
  const { section, questionNumber } = req.body;
  
  if (!section || !questionNumber) {
    return res.status(400).json({ 
      error: 'Missing required parameters: section and questionNumber' 
    });
  }

  if (!responses[section] || !responses[section][questionNumber]) {
    return res.status(400).json({ 
      error: 'Invalid section or question number' 
    });
  }

  res.json({ 
    response: responses[section][questionNumber]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
