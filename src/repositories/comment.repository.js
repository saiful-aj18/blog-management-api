const Comment = require("../models/Comment.js");

class commentRepository {
    async create(data) {
        return await Comment.create(data);
    }

     async findById(id) {
        return await Comment.findById(id);
    }


    async findByBlogPost(blogPostId) {
        return await Comment.find({ blogPostId }).populate("user", 'name email').sort({ createdAt: 1 }).lean();
    }

}

module.exports = new commentRepository();