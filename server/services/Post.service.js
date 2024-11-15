const { Post } = require('../db/models')
const { Op } = require('sequelize')


module.exports = class PostService {
  
  static async getFilteredPosts() {
    try {
      const posts = await Post.findAll({

      })
    } catch (error) {
      throw new Error(error)
    }
  }














  // --------------------------------------------------------------------
  static async getAllPosts() {
    try {
      const posts = (await Post.findAll()).map((el) => el.get())
      return posts ? posts : null
    } catch (error) {
      throw new Error(error)
    }
  }


  static async getOnePost() {
    try {
      
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getPostById() {
    try {
      
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getPostByUser() {
    try {
      
    } catch (error) {
      throw new Error(error)
    }
  }
  static async deletePostByUser() {
    try {
      
    } catch (error) {
      throw new Error(error)
    }
  }
}