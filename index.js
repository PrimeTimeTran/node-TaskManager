require("./src/db/mongoose");

const multer = require("multer");
const express = require("express");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, params => {
  console.log("Listening on port " + port);
});

// ✍️📚 Relationships between Users & Tasks

// const Task = require("./src/models/task");
// const User = require("./src/models/user");
// const main = async () => {
//   const task = await Task.findById("5e17f30ae00b898cb458687f");
//   await task.populate("owner").execPopulate();
//   // console.log(task.owner)

//   const user = await User.findById("5e17f2c4c359db8cab946db2");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();

// ✍️📚 How to one way hash a password
// const myFunction = () => {
//   const token = jwt.sign({ _id: "abc123" }, "this is my ssecret", { expiresIn: '7 days' });
//   const payload = jwt.verify(token, "this is my ssecret")

//   console.log({ token, payload });
// };

// myFunction();

// ✍️📚 Image Upload
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000
  }
});

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});
