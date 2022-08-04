const fs = require('fs')
const { Post } = require('../sequelize')
const { handleUpdateWithImage, handleTextOnlyUpdate } = require('../utils/postUpdate')

exports.getPosts = (req, res) => {
  Post.findAll({ order: [['createdAt', 'DESC']]})
    .then(posts => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ message: `Oops, something went wrong while finding all the posts: ${error}`}))
}

exports.getOnePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id }})
    .then(data => {
      const post = data.dataValues
      res.status(200).json({post})
    })
    .catch((error) => res.status(404).json({ message: `Oops, something went wrong while finding this post: ${error}`}))
}

exports.createPost = (req, res) => {
  if (req.file) {
    const postObject = JSON.parse(req.body.post)
    const post = new Post({
      text: postObject.text,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.userId
    })
    post.save()
      .then((data) => res.status(201).json({ message: "Post created with image linked!", data: data.dataValues }))
      .catch((error) => res.status(500).json({ message: `Oops something went wrong in registring your post with image in the DataBase: ${error}`}))
  } else {
    const post = new Post({
      text: req.body.text,
      image: null,
      userId: req.userId
    })
    post.save()
      .then((data) => res.status(201). json({ message: "Post Created", data: data.dataValues }))
      .catch((error) => res.status(500).json({ message: `Oops something went wrong registering your post without image in the DataBase: ${error}`}))
  }
  
}

exports.updatePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id }})
    .then(data => {
      const post = data.dataValues
      if (req.userId === post.userId || res.isAdmin === true) {
        if (req.file) {
          handleUpdateWithImage(req, res, post)
        } else {
          handleTextOnlyUpdate(req, res, post)
        }
      } else {
        res.status(403).json({ message: "Unauthorized request! Only the post owner may update it or an admin and you're neither!"})
      }
    })
    .catch((error) => res.status(500).json({ message: `Oops something went wrong querying the database about your post: ${error}`}))
}

exports.deletePost = (req, res) => {
  Post.findOne({ where: {id: req.params.id}})
    .then(data => {
      const post = data.dataValues
      if (req.userId === post.userId || req.isAdmin === true) {
        if (post.image) {
          const filename = post.image.split('/images/')[1]
          fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { id: req.params.id }})
              .then(() => res.status(204).json({ message: "Post deleted and image linked deleted"}))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong attempting to delete that post: ${error}`}))
          })
        } else {
          Post.destroy({ where: { id: req.params.id }})
              .then(() => res.status(204).json({ message: "Post without image deleted"}))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong attempting to delete that post: ${error}`}))
        }
      } else {
        res.status(403).json({ message: `Unauthorized request, only the owner of the post or an admin is able to delete this post`})
      }
    })
    .catch((error) => res.status(500).json({ message: `Oops something went wonrg finding the post in the DB ${error}`}))
}

exports.likeStatus = (req, res) => {
  const postId = req.params.id
  const userId = req.userId
  Post.findOne({ where: { id: postId }})
    .then(data => {
      if (data) {
        let post = data.dataValues
        let likes = post.likes
        let dislikes = post.dislikes
        let usersLiked = post.usersLiked
        let usersDisliked = post.usersDisliked
        switch (req.body.like) {
          case 1:
            if (!usersLiked.includes(userId)) {
              usersLiked.push(userId)
              likes = likes +1
            }
            if (usersDisliked.includes(userId)) {
              const userIndex = usersDisliked.indexOf(userId)
              usersDisliked.splice(userIndex, 1)
              dislikes = dislikes -1
            }
            Post.update({ likes: likes, dislikes: dislikes, usersLiked: usersLiked, usersDisliked: usersDisliked }, { where: { id: postId }})
              .then(() => res.status(200).json({ message: "Post liked" }))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong while counting your like to that post: ${error}`}))
            break
          case 0:
            if (usersLiked.includes(userId)) {
              const userIndex = usersLiked.indexOf(userId)
              usersLiked.splice(userIndex, 1)
              likes = likes -1
            }
            if (usersDisliked.includes(userId)) {
              const userIndex = usersDisliked.indexOf(userId)
              usersDisliked.splice(userIndex, 1)
              dislikes = dislikes -1
            }
            Post.update({ likes: likes, dislikes: dislikes, usersLiked: usersLiked, usersDisliked: usersDisliked }, { where: { id: postId }})
              .then(() => res.status(200).json({ message: "Like status brought back to zero"}))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong cancelling your like status: ${error}`}))
            break
          case -1:
            if (!usersDisliked.includes(userId)) {
              usersDisliked.push(userId)
              dislikes = dislikes +1
            }
            if (usersLiked.includes(userId)) {
              const userIndex = usersLiked.indexOf(userId)
              usersLiked.splice(userIndex, 1)
              likes = likes -1
            }
            Post.update({ likes: likes, dislikes: dislikes, usersLiked: usersLiked, usersDisliked: usersDisliked }, { where: { id: req.params.id }})
              .then(() => res.status(200).json({ message: "Post disliked"}))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong while counting your dislike to the post: ${error}`}))
            break
        }
      } else {
        res.status(404).json({ message: "You tried to like an unexisting post!"})
      }
    })
    .catch((error) => res.status(500).json({ message: `Oops something went wrong finding that post for defining its likeStatus! ${error}`}))
}