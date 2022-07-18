// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log(`Connected to DB`);
});

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
