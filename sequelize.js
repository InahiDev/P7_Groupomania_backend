const Sequelize = require('sequelize')
const UserModel = require('./models/User')
const PostModel = require('./models/Post')
const dotenv = require('dotenv')
dotenv.config()
const USERNAME = process.env.DB_USERNAME
const PSWD = process.env.DB_PSWD
const DB_PORT = process.env.DB_PORT
const DB_DIALECT = process.env.DB_DIALECT

const sequelize = new Sequelize('groupomania', USERNAME, PSWD, {
  port: DB_PORT,
  dialect: DB_DIALECT
})

const User = UserModel(sequelize, Sequelize)
const Post = PostModel(sequelize, Sequelize)

sequelize.authenticate()
  .then(() => console.log('Database connexion correct'))
  .catch((error) => console.log(`Database connexion not complete: ${error}`))

sequelize.sync()
  .then(() => console.log('Tables created and/or uptaded with models!'))
  .catch((error) => console.log(`Oops, something went wrong with updating tables: ${error}`))

// module.exports = User
// module.exports = Post
module.exports = sequelize