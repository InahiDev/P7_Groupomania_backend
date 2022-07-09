const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const pswdCtrl = require('../middleware/pswdCtrl')

router.post('/signup', pswdCtrl, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router