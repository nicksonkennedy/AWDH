const express = require('express')
const router = express.Router()
const {getComplaints, addComplaints} = require('../controllers/complaintsController')
const auth = require('../middleware/auth')

//
router.post('/add' ,addComplaints)
router.get('/get', getComplaints)

module.exports = router