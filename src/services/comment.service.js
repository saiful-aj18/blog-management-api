const commentRepository = require("../repositories/comment.repository.js");


class commentService {
    async addComment(data) {
        if (!data.content || !data.blogPostId) {
            throw new Error("Content and blogPostId are required");
        }

        if(data.parentId) {
            const parentComment = await commentRepository.findById(data.parentId);
            if(!parentComment) {
                throw new Error("Parent comment not found");
            }
        }

        return await commentRepository.create(data);
    }

    async getComments(blogPostId) {
        const comments = await commentRepository.findByBlogPost(blogPostId);

        // build a tree structure for nested comments
        const commentMap = {};
        const tree = [];

        comments.forEach(comment => {
            comment.replies = [];
            commentMap[comment._id] = comment;
        })

        // comments Map looks like
        // {
        //     '7485': { ...commentData, replies: [{{ ...commentData, parentId: 7485 replies: [] },}] , parentId: null },
        //     '5645': { ...commentData, parentId: 7485 replies: [] },
        //     '5645': { ...commentData, parentId: null replies: [] },
        //     ...
        // }


        comments.forEach(comment  => {
            if(comment.parentId) {
                if (commentMap[comment.parentId]) {
                    commentMap[comment.parentId].replies.push(comment);
                }
            } else {
                tree.push(comment);
            }
        })


        return tree;
    }
}


module.exports = new commentService();