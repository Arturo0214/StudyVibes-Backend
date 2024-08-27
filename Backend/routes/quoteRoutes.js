const express = require('express');
const router = express.Router();
const { createQuote, getAllQuotes, getQuoteById, updateQuote, deleteQuote } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

router.get('/getAll', protect, getAllQuotes);
router.get('/:id', protect, getQuoteById);
router.post('/', createQuote);
router.put('/update/:id', updateQuote);
router.delete('/:id', protect, deleteQuote);

module.exports = router;