// Validation utilities
function validateSection(section, sections) {
    if (!sections[section]) {
      throw new Error('Invalid section');
    }
  }
  
  function validateQuestionNumber(section, questionNumber, sections) {
    const questions = sections[section].questions;
    if (questionNumber < 1 || questionNumber > questions.length) {
      throw new Error('Invalid question number');
    }
  }
  
  module.exports = {
    validateSection,
    validateQuestionNumber
  };