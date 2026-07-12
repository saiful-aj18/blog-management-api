require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 9050;


// Connect to the database
connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

