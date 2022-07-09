const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/post')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/', auth, postCtrl.getPosts)
router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.updatePost)
router.delete('/:id', auth, postCtrl.deletePost)
router.post('/:id/like', auth, postCtrl.likeStatus)

module.exports = router
