const express = require("express");
const blogController = require("../controllers/blog.controller.js");
const { protect } = require("../middlewares/auth.middleware.js");

const router = express.Router();


// public Routes
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);


// private Routes
router.post("/", protect , blogController.createBlog);


module.exports = router;