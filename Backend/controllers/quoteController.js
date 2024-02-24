const asyncHandler = require('express-async-handler')
const Quote = require('../models/quoteModel')

const createQuote = asyncHandler(async (req, res) => {

    const {
      taskType,
      studyArea,
      educationLevel,
      taskTitle,
      requirements,
      length,
      dueDate,
      email,
      whatsApp
    } = req.body;

    const quote = await Quote.create({
        taskType,
        studyArea,
        educationLevel,
        taskTitle,
        requirements,
        length,
        dueDate,
        email,
        whatsApp,
      });
    
      res.status(201).json(quote);
})

// Get all quotes
const getAllQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quote.find({});
  res.status(200).json(quotes);
});

// Get a quote by ID
const getQuoteById = asyncHandler(async (req, res) => {
  const quoteId = req.params.id;
  const quote = await Quote.findById(quoteId);

  if (quote) {
    res.status(200).json(quote);
  } else {
    res.status(404);
    throw new Error('Quote not found');
  }
});

// Update a quote by ID
const updateQuote = asyncHandler(async (req, res) => {
  const quoteId = req.params.id;
  const {
    taskType,
    studyArea,
    educationLevel,
    taskTitle,
    requirements,
    length,
    dueDate,
    email,
    phoneNumber,
  } = req.body;

  const quote = await Quote.findById(quoteId);

  if (quote) {
    quote.taskType = taskType;
    quote.studyArea = studyArea;
    quote.educationLevel = educationLevel;
    quote.taskTitle = taskTitle;
    quote.requirements = requirements;
    quote.length = length;
    quote.dueDate = dueDate;
    quote.email = email;
    quote.phoneNumber = phoneNumber;

    const updatedQuote = await quote.save();
    res.status(200).json(updatedQuote);
  } else {
    res.status(404);
    throw new Error('Quote not found');
  }
});

// Delete a quote by ID
const deleteQuote = asyncHandler(async (req, res) => {
  const quoteId = req.params.id;
  const quote = await Quote.findByIdAndDelete(quoteId);

  if (quote) {
    res.status(200).json({ message: 'Quote deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Quote not found');
  }
});

module.exports = {
    createQuote,
    getAllQuotes,
    getQuoteById,
    updateQuote,
    deleteQuote
}