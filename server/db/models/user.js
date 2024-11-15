'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Post }) {
      this.hasMany(Post, {
        foreignKey: "user_id"
      })
    }
  }
  User.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};