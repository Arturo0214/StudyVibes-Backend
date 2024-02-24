const express = require('express')
const router = express.Router()
const {createQuote, getAllQuotes, getQuoteById, updateQuote, deleteQuote} = require('../controllers/quoteController')

router.post('/', createQuote)
router.get('/:id', getQuoteById)
router.get('/getAll', getAllQuotes)
router.put('/update', updateQuote)
router.delete(':id', deleteQuote)

module.exports = router