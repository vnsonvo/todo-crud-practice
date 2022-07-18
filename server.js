// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// mongoose.connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
