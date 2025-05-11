const mongoose = require('mongoose');

// Load all models
require('./Course');
require('./Module');
require('./Lesson');
require('./Quiz');
require('./Question');
require('./Certificate');

module.exports = {
  Course: mongoose.model('Course'),
  Module: mongoose.model('Module'),
  Lesson: mongoose.model('Lesson'),
  Quiz: mongoose.model('Quiz'),
  Question: mongoose.model('Question'),
  Certificate: mongoose.model('Certificate')
};