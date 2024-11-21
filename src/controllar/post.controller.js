const { success } = require("../utils/responseWrapper");

const getAllPostsController = async (req, res) => {
    // return res.json({
    //     posts: 'here are all of the posts',
    // });
    return res.send(success(200,{
        posts: 'here are all of the posts',
    }))
};

module.exports = {
    getAllPostsController,
};