const PostService = require('../services/Post.service')

exports.getAllPostsController = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts()
    res.status(200).json({ message: 'success', posts })
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message })
  }
}

exports.getFilteredPostsController = async (req, res) => {
  try {
    const { searchQuery, excludeWords } = req.body
    if (searchQuery.trim() === '' || excludeWords.trim() === '') {
      console.log('Please, fill the fields');
      return res.status(400).json({ message: 'Please, fill the fields' })
    }

    const posts = await PostService.getFilteredPosts(searchQuery, excludeWords)
    if (posts) {
      return res.status(200).json({ message: "success", posts });
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deletePostsController = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = res.locals.user.id;
    let post = await PostService.getPostById(postId);
    if (post) {
      post = await PostService.deletePostByUser(postId, userId);
      return res.status(200).json({ message: "success", post });
    }
    res.status(400).json({ message: "invalid" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}