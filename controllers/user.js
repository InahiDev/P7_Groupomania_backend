const { User } = require('../sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const TOKEN_KEY = process.env.TOKEN_KEY

module.exports.signup = (req, res) => {
  if (req.body.isAdmin === true) {
    return res.status(403).json({ message: "You cannot give yourself admin rights on this application!"})
  }
  if(validator.isEmail(req.body.email)) {
    User.findAll({ where: { email: req.body.email }})
      .then(data => {
        if (data.length !== 0) {
          return res.status(400).json({ message: `This email already has an account, please login instead`})
        } else {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const user = new User({
                email: req.body.email,
                password: hash
              })
              user.save()
                .then(() => res.status(201).json({ message: "User account created succesfully!" }))
                .catch((error) => res.status(500).json({ message: `Oops something went wrong during registration in the DB ${error}` }))
              })
            .catch((error) => res.status(500).json({ message: `Oops something went wrong within the encryption: ${error}` }))
        }
      })
      .catch((error) => res.status(500).json({ message: `Oops something went wrong querying the DB ${error}` }))
  } else {
    res.status(400).json({ message: "That's not an email buddy!"})
  }
}

exports.login = (req, res) => {
  if (validator.isEmail(req.body.email)) {
    User.findAll(({ where: { email: req.body.email }}))
      .then((data) => {
        if (data.length === 0) {
          res.status(404).json({ message: "User not yet registered, please signup before try to log in our marvellous social network!"})
        } else {
          const user = data[0]
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(400).json({ message: "Unvalid password!"})
              } else {
                res.status(200).json({
                  userId: user.id,
                  token: jwt.sign(
                    { userId: user.id,
                    isAdmin: user.isAdmin },
                    TOKEN_KEY,
                    { expiresIn: '3h' } /*demandé par les spécifications, mais attention sécurité!*/
                  )
                })
              }
            })
            .catch((error) => res.status(500).json({ message: `Oops, something went wrong during decryption of your password: ${error}`}))
        }
      })
      .catch((error) => res.status(500).json({ message: `Oops something went wrong while finding you in the DB ${error}`}))
  } else {
    res.status(400).json({ message: "That's not an email buddy!"})
  }
}