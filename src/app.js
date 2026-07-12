const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const authRoutes = require("./routes/auth.route.js");
const blogRoutes = require('./routes/blog.route.js');
const commentRoutes = require('./routes/comment.route.js');


const app = express();

app.use(express.json());
app.use(cors());


// Logging middleware
app.use((req, res, next) => {
  logger.info(`Request Method -->>> ${req.method}. Request URL -->>> ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes)


app.get("/health", (req, res) => {
    logger.info("Health check requested!");
    res.send("Health check passed!");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});


module.exports = app;