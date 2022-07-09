const fs = require('fs')
const PostModel = require('../models/Post')
const UserModel = require('../models/User')
const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Post = PostModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)

exports.getPosts = (req, res) => {
  Post.findAll({ order: [['createdAt', 'DESC']]})
    .then(posts => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ message: `Oops, something went wrong while finding all the posts: ${error}`}))
}

exports.createPost = (req, res) => {
  if (req.file) {
    const postObject = JSON.parse(req.body.post)
    const post = new Post({
      ...postObject,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.userId
    })
    post.create()
      .then(() => res.status(201).json({ message: "Post created!"}))
      .catch((error) => res.status(500).json({ message: `Oops something went wrong in registring your post with image in the DataBase: ${error}`}))
  } else {
    const post = new Post({
      text: req.body.text,
      image: null,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      userId: req.userId
    })
    post.create()
      .then()
      .catch((error) => res.status(500).json({ message: `Oops something went wrong registering your post without image in the DataBase: ${error}`}))
  }
  
}

exports.updatePost = (req, res) => {
  if (req.file) {
    Post.findOne({ where: { id: req.params.id}})
      .then(post => {
        if (req.userId === post.user_id || req.isAdmin === true) {
          const postObject = {
            ...JSON.parse(req.body.post),
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          const filename = post.image.split('/images/')[1]
          fs.unlink(`images/${filename}`, () => {
            Post.update({ ...postObject }, { where: { id: req.params.id }})
              .then(() => res.status(200).json({ message: "Post updated and previous image deleted"}))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong during update of your post, concerning image or simple update: ${error}`}))
          })
        } else {
          res.status(403).json({ message: "Unauthorized request! Only the post owner may update it or an admin!"})
        }
      })
      .catch((error) => res.status(404).json({ message: `Oops something went wrong while finding the post to update: ${error}`}))
  } else {
    Post.findOne({ where: { id: req.params.id}})
      .then(post => {
        if (req.userId === post.user_id || req.isAdmin === true) {
          const postObject = { ...req.body }
          Post.update({ ...postObject }, { where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: "Post updated whitout image changes!"}))
            .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of the post whitout change on image ${error}`}))
        }
      })
      .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of your post whitout image: ${error}`}))
  }
}

exports.deletePost = (req, res) => {
  Post.findOne({ where: {id: req.params.id}})
    .then(post => {
      if (req.userId === post.user_id || req.isAdmin === true) {
        const filename = post.image.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id }})
            .then(() => res.status(204).json({ message: "Post deleted"}))
            .catch((error) => res.status(500).json({ message: `Oops something went wrong attempting to delete that post: ${error}`}))
        })
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
    .then(post => {
      let likes = post.likes
      let dislikes = post.dislikes
      let usersLiked = post.usersLiked
      let usersDisliked = post.usersDisliked
      switch (req.body.like) {
        case 1:
          if (!usersLiked.includes(userId)) {
            usersLiked.push(userId)
            likes ++
          }
          if (usersDisliked.includes(userId)) {
            const userIndex = usersDisliked.indexOf(userId)
            usersDisliked.splice(userIndex, 1)
            dislikes --
          }
          Post.update(/*{ fields: ['likes', 'dislikes', 'usersLiked', 'usersDisliked']},*/ { where: { id: postId }})
            .then(() => res.status(200).json({ message: "Post liked"}))
            .catch((error) => res.status(500).json({ message: `Oops something went wrong while counting your like to that post: ${error}`}))
          break
        case 0:
          if (!usersLiked.includes(userId)) {
            const userIndex = usersLiked.indexOf(userId)
            usersLiked.splice(userIndex, 1)
            likes --
          }
          if (!usersDisliked.includes(userId)) {
            const userIndex = usersDisliked.indexOf(userId)
            usersDisliked.splice(userIndex, 1)
            dislikes --
          }
          Post.upadte({ where: { id: postId }})
            .then(() => res.status(200).json({ message: "Like status brought back to zero"}))
            .catch((error) => res.status(500).json({ message: `Oops something went wrong cancelling your like status: ${error}`}))
          break
          case -1:
            if (!usersDisliked.includes(userId)) {
              usersDisliked.push(userId)
              dislikes --
            }
            if (usersLiked.includes(userId)) {
              const userIndex = usersLiked.indexOf(userId)
              usersLiked.splice(userIndex, 1)
              likes --
            }
            Post.update({ where: { id: req.params.id }})
              .then(() => res.status(200).json({ message: "Post disliked"}))
              .catch((error) => res.status(500).json({ message: `Oops something went wrong while counting your dislike to the post: ${error}`}))
      }
    })
    .catch((error) => res.status(500).json({ message: `Oops something went wrong finding that post for defining its likeStatus! ${error}`}))
}