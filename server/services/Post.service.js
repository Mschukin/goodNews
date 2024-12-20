const { Post } = require('../db/models')
const { Op } = require('sequelize')


module.exports = class PostService {
  static async getAllPosts() {
    try {
      const posts = await Post.findAll()

      return posts 
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getFilteredPosts(searchQuery, excludeWords) {
    try {
      const excludeWordsArray = excludeWords
        .split(" ")
        .map((word) => `%${word}%`);
        console.log(excludeWordsArray, searchQuery);
        
      const filteredPost = await Post.findAll({
        where: {
          [Op.and]: [
            {
              description: {
                [Op.notLike]: {
                  [Op.any]: excludeWordsArray,
                },
              },
            },
            {
              [Op.or]: [
                { title: { [Op.iLike]: `%${searchQuery}%` } },
                { description: { [Op.iLike]: `%${searchQuery}%` } },
              ],
            },
          ],
        },
      });

      return filteredPost 
    } catch (error) {
      throw new Error(error)
    }
  }
}















  // --------------------------------------------------------------------
//   static async getAllPosts() {
//     try {
//       const posts = (await Post.findAll()).map((el) => el.get())
//       return posts ? posts : null
//     } catch (error) {
//       throw new Error(error)
//     }
//   }


//   static async getOnePost() {
//     try {
      
//     } catch (error) {
//       throw new Error(error)
//     }
//   }

//   static async getPostById() {
//     try {
      
//     } catch (error) {
//       throw new Error(error)
//     }
//   }

//   static async getPostByUser() {
//     try {
      
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
//   static async deletePostByUser() {
//     try {
      
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
// }