import { getMediaContent } from './mediaHandler.js';
import { validateSection, validateQuestionNumber } from './validators.js';
import { sections } from '../data/sections.js';

function getResponse(section, questionNumber) {
  // Validate inputs
  validateSection(section, sections);
  validateQuestionNumber(section, questionNumber, sections);

  // Get response and media content
  const response = sections[section].responses[questionNumber];
  const media = getMediaContent(section, questionNumber);

  // Return combined response
  return {
    response,
    ...media
  };
}

module.exports = { getResponse };
