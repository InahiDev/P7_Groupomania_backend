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
    usersLiked: {
      type: type.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('usersLiked').split(';')
      },
      set(value) {
        this.setDataValue('usersLiked', value.join(';'))
      }
    },
    usersDisliked: {
      type: type.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('usersDisliked').split(';')
      },
      set(value) {
        this.setDataValue('usersDisliked', value.join(';'))
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