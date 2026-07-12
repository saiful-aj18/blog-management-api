const commentService = require("../services/comment.service.js");
const logger = require("../utils/logger.js");

class CommentController {
     async addComment(req,res) {
        try {
            const ObjectToSave = {
                ...req.body,
                user: req.user._id
            }
            const newComment = await commentService.addComment(ObjectToSave);
            res.status(201).json({ success: true, data: newComment });
        } catch (error) {
            logger.error(`Error adding comment: ${error.message}`);
            res.status(500).json({ success: false, error: error.message });
        }
     }

     async getComments(req,res) {
        try {
            const comments = await commentService.getComments(req.params.blogPostId);
            res.status(200).json({ success: true, data: comments });
        } catch (error) {
            logger.error(`Error getting comments: ${error.message}`);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new CommentController();