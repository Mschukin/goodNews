'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "user_id"
      })
    }
  }
  Post.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING(1000),
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {

      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: "Users",
      },
      onDelete: "cascade",
    },
  }, {
    sequelize,
    modelName: "Post",
  });
  return Post;
};