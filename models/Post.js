const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) => {
  return sequelize.define('post', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: type.STRING,
      allowNull: false
    },
    image: {
      type: type.STRING
    },
    likes: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dislikes: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    usersLiked: {       //Avec des BDD SQL il est plus simple est préférable d'utiliser des tables de relations Many to Many pour effectuer ce travail
      type: type.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        return this.getDataValue('usersLiked')
      },
      set(value) {
        this.setDataValue('usersLiked', value)
      }
    },
    usersDisliked: {
      type: type.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        return this.getDataValue('usersDisliked')
      },
      set(value) {
        this.setDataValue('usersDisliked', value)
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  })
}