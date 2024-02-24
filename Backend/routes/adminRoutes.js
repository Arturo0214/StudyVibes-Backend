const express = require('express')
const router = express.Router()
const { adminRegister, adminLogin, getData, getAllAdmins, getAdminById, deleteAdmin } = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', adminRegister)
router.post('/login', adminLogin)
router.get('/misdatos', protect, getData)
router.get('/getadmins', protect, getAllAdmins)
router.delete('/:id', protect, deleteAdmin)
router.get('/:id', protect, getAdminById)

module.exports = router