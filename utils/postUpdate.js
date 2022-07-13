const fs = require("fs")
const { Post } = require("../sequelize")

//--------------------------------------------------------//
//----------------------Req.file Update-------------------//
//--------------------------------------------------------//

function handleUpdateWithImage(req, res, post) {
  const postObject = JSON.parse(req.body.post)
  const updatePost = new Post({
    text: postObject.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  if (post.image) {
    imageUpdating(req, res, post, updatePost)
  } else { 
    uploadingImageToPost(req, res, updatePost)
  }
}

function imageUpdating(req, res, post, updatePost) {
  const filename = post.image.split('/images/')[1]
  fs.unlink(`images/${filename}`, () => {
    updatingPostWithImage(req, res, updatePost)
  })
}

function updatingPostWithImage(req, res, updatePost) {
  Post.update({ text: updatePost.text, image: updatePost.image }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Post updated and previous image deleted" }))
    .catch((error) => res.status(500).json({ message: `Oops something went wrong during update of your post, concerning image or simple update: ${error}` }))
}

function uploadingImageToPost(req, res, updatePost) {
  Post.update({ text: updatePost.text, image: updatePost.image }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Post updated and new image uploaded" }))
    .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of your new image in this post: ${error}` }))
}

//--------------------------------------------------------//
//----------------------Req.body Update-------------------//
//--------------------------------------------------------//

function handleTextOnlyUpdate(req, res, post) {
  if (req.body.image === "") {
    postImageHandler(req, res, post)
  } else if (!req.body.image) {
    textOnlyUpdate(req, res)
  } else {
    res.status(400).json({ message: "Invalid update request"})
  }
}

function postImageHandler(req, res, post) {
  if (post.image) {
    imageDeleting(req, res, post)
  } else {
    textUpdateWithoutImageDeletion(req, res)
  }
}

function imageDeleting(req, res, post) {
  const filename = post.image.split('/images/')[1]
  fs.unlink(`images/${filename}`, () => {
    updatingPostWithoutImage(req, res)
  })
}

function updatingPostWithoutImage(req, res) {
  Post.update({ text: req.body.text, image: null}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Post updated with image deletion" }))
    .catch((error) => res.status(500).json({ message: `Oops something went wrong during update of your post, concerning image or simple update: ${error}` }))
}

function textUpdateWithoutImageDeletion(req, res) {
  Post.update({ text: req.body.text }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Post updated! It still has no image!" }))
    .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of the post whitout image: ${error}` }))
}

function textOnlyUpdate(req, res) {
  Post.update({ text: req.body.text }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Post updated with text changes only!" }))
    .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of the post without image ${error}` }))
}



module.exports = { handleUpdateWithImage, handleTextOnlyUpdate }