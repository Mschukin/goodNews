const axios = require("axios");
const { Post } = require("../db/models");
const { Op } = require("sequelize");

class PostController {
  async searchPost(req, res) {
    const { searchQuery, excludeWords, id } = req.body;

    const apiKey = "c7917b92dd944ac78217f1fa5d23ea58";
    console.log(id);

    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchQuery
        )}&language=ru&pageSize=10&apiKey=${apiKey}`
      );
      console.log("API Response:", response.data.articles);

      const postItems = response.data.articles
        .filter((article) => article.urlToImage)
        .map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.urlToImage,
          user_id: id,
        }));

      if (postItems.length === 0) {
        console.log("No Post items found");
        return res.status(404).json({ message: "No Post items found" });
      }

      const existingUrls = await Post.findAll({
        attributes: ["url"],
        where: {
          url: {
            [Op.in]: postItems.map((item) => item.url),
          },
        },
      });

      const existingUrlsSet = new Set(existingUrls.map((post) => post.url));

      const uniquePostItems = postItems.filter(
        (item) => !existingUrlsSet.has(item.url)
      );

      if (uniquePostItems.length > 0) {
        console.log("Unique Post Items:", uniquePostItems);
        await Post.bulkCreate(uniquePostItems);
      } else {
        console.log("All Post items are duplicates");
      }

      const excludeWordsArray = excludeWords
        .split(" ")
        .map((word) => `%${word}%`);
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

      console.log("Filtered Posts:", filteredPost);

      res.json(filteredPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new PostController();
