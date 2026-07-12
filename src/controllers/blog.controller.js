const blogService = require('../services/blog.service.js');
const logger = require('../utils/logger.js');

class BlogController {
    async getAllBlogs(req,res) {
        try {
            const blogs = await blogService.getAllBlogs();
            res.status(200).json({ success: true, data: blogs });
        } catch (error) {
            logger.error(`Error getting all blogs: ${error.message}`);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getBlogById(req,res) {
        try {
            const blog = await blogService.getBlogById(req.params.id);
            res.status(200).json({ success: true, data: blog });
        } catch (error) {
            logger.error(`Error getting blog by id: ${error.message}`);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createBlog(req,res) {
        try {
            const blog = await blogService.createBlog(req.body, req.user._id);
            res.status(201).json({ success: true, data: blog });
        } catch (error) {
            logger.error(`Error creating blog: ${error.message}`);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new BlogController();