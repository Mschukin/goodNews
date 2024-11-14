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
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    url: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT,
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