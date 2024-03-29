// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Todo = require("./models/Todo");

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log(`Connected to DB`);
});

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    Todo.find({}, (err, todos) => {
      res.render("index.ejs", { todos: todos });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/", async (req, res) => {
  const todo = new Todo({ title: req.body.title, content: req.body.content });
  try {
    await todo.save();
    console.log(todo);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ meesage: err.message });
  }
});

app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    Todo.find({}, (err, todos) => {
      res.render("edit.ejs", { todos: todos, id: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;

    Todo.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      (err, todo) => {
        if (err) return res.status(500).send(err);
        res.redirect("/");
      }
    );
  });

app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  Todo.findByIdAndRemove(id, (err, todo) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
