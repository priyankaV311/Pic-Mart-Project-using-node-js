const getAllPostsController = (req, res) => {
    return res.json({
        posts: 'here are all of the posts',
    });
};

module.exports = {
    getAllPostsController,
};
