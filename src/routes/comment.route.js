const express = require("express");
const commentController = require("../controllers/comment.controller.js");


const { protect } = require("../middlewares/auth.middleware.js");

const router = express.Router();


router.post("/", protect, commentController.addComment);


router.get("/:blogPostId", commentController.getComments);


module.exports = router;