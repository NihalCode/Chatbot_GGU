const { getMediaContent } = require('./mediaHandler.js');
const { validateSection, validateQuestionNumber } = require('./validators.js');
const sections = require('../data/sections.js');

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
