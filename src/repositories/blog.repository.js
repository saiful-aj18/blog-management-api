const Blog = require("../models/Blog.js");


class BlogRepository {
    async create(data) {
        return await Blog.create(data);
    }

    async findById(id) {
        return await Blog.findById(id).populate("author", 'name email');
    }

    async findAll() {
        return await Blog.find().populate("author", 'name email').sort({ createdAt: -1 });
    }
}

module.exports = new BlogRepository();