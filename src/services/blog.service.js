const blogRepository = require("../repositories/blog.repository.js");


class BlogService {
    async createBlog(data, userId) {
        if(!data.title || !data.content) {
            throw new Error("Title and content are required");
        }

        return await blogRepository.create({...data, author: userId});
    }

    async getAllBlogs() {
        return await blogRepository.findAll();
    }
    
    async getBlogById(id) {
        const blog = await blogRepository.findById(id);
        if(!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    }
}

module.exports = new BlogService();