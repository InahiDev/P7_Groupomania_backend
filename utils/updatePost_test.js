
//exports.updatePost = (req, res) => {  //La recherche du Post.findOne jusqu'à la vérification admin, qui est nécessaire dans les deux cas => utiliser avant la condition req.file
//  if (req.file) {
//    Post.findOne({ where: { id: req.params.id }})
//      .then(post => {
//        if (req.userId === post.userId || req.isAdmin === true) {
//          const postObject = JSON.parse(req.body.post)
//          const updatePost = new Post({
//            text: postObject.text,
//            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//          })
//          if (post.image) {
//            const filename = post.image.split('/images/')[1]
//            fs.unlink(`images/${filename}`, () => {
//              Post.update({ text: updatePost.text, image: updatePost.image }, { where: { id: req.params.id }})
//                .then(() => res.status(200).json({ message: "Post updated and previous image deleted"}))
//                .catch((error) => res.status(500).json({ message: `Oops something went wrong during update of your post, concerning image or simple update: ${error}`}))
//            })
//          } else {
//            Post.update({ text: updatePost.text, image: updatePost.image }, { where: { id: req.params.id }})
//              .then(() => res.status(200).json({ message: "Post updated and new image uploaded"}))
//              .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of your new image in this post: ${error}`}))
//          }
//        } else {
//          res.status(403).json({ message: "Unauthorized request! Only the post owner may update it or an admin and you're neither!"})
//        }
//      })
//      .catch((error) => res.status(404).json({ message: `Oops something went wrong while finding the post to update: ${error}`}))
//  } else {
//    Post.findOne({ where: { id: req.params.id}})
//      .then(post => {
//        if (req.userId === post.userId || req.isAdmin === true) {
//          if (req.body.image === "") {
//            if (post.image) {
//              const filename = post.image.split('/images/')[1]
//              fs.unlink(`images/${filename}`, () => {
//                Post.update({ text: req.body.text, image: null }, { where: { id: req.params.id }})
//                  .then(() => res.status(200).json({ message: "Post updated with image deletion"}))
//                  .catch((error) => res.status(500).json({ message: `Oops something went wrong during update of your post, concerning image or simple update: ${error}`}))
//              })
//            } else {
//              Post.update({ text: req.body.text }, { where: { id: req.params.id }})
//              .then(() => res.status(200).json({ message: "Post updated! It still has no image!"}))
//              .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of the post whitout change on image ${error}`}))
//            }
//          } else if (!req.body.image) {
//            Post.update({ text: req.body.text }, { where: { id: req.params.id }})
//              .then(() => res.status(200).json({ message: "Post updated with text changes only!"}))
//              .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of the post whitout change on image ${error}`}))
//          } else {
//            res.status(400).json({ message: "Invalid update request"})
//          }
//        } else {
//          res.status(403).json({ message: "Unauthorized request! Only the post owner may update it or an admin and you're neither!"})
//        }
//      })
//      .catch((error) => res.status(500).json({ message: `Oops something went wrong during the update of your post whitout image: ${error}`}))
//  }
//}
