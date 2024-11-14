const axios = require('axios');
const {Post} = require('../db/models');
const { Op } = require('sequelize');


class PostController {
    async searchPost(req, res) {
        const { searchQuery, excludeWords } = req.body;
        const apiKey = 'c7917b92dd944ac78217f1fa5d23ea58'; 
        const authUser = res.locals.user
        try {
            const response = await axios.get(`https://postapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=ru&pageSize=10&apiKey=${apiKey}`);
            console.log(response.data.articles);
            
            const postItems = response.data.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                img: article.urlToImage,
                user_id: 1//authUser.id
            }));

            if (postItems.length === 0) {
                console.log('No Post items found');
                return res.status(404).json({ message: 'No Post items found' });
            }

            await Post.bulkCreate(postItems);

            const excludeWordsArray = excludeWords.split(' ').map(word => `%${word}%`);
            const filteredPost = await Post.findAll({
                where: {
                    [Op.and]: [
                        {
                            description: {
                                [Op.notLike]: {
                                    [Op.any]: excludeWordsArray
                                }
                            }
                        },
                        {
                            [Op.or]: [
                                { title: { [Op.iLike]: `%${searchQuery}%` } },
                                { description: { [Op.iLike]: `%${searchQuery}%` } }
                            ]
                        }
                    ]
                }
            });


            res.json(filteredPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new PostController();