const express = require('express')
const router = express.Router()
const {adminRegister,adminLogin, adminlogout, adminLoggedIn} = require('../controllers/authController')
const auth = require('../middleware/auth')

//
router.post('/register' , adminRegister)
router.post('/login' , adminLogin)
router.get('/logout' , adminlogout)
router.get('/loggedIn', adminLoggedIn)



router.post('/test', auth, async(req, res)=>{
    try {
    const {name} = req.body
    console.log(name)
    } catch (error) {
        res.json(error)
    }
})
module.exports = router