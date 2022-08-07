const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const pswdCtrl = require('../middleware/pswdCtrl')
const auth = require('../middleware/auth')

router.post('/signup', pswdCtrl, userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/relog', auth, userCtrl.relog)
router.delete('/unsubscribe', auth, userCtrl.unsubscribe)

module.exports = router