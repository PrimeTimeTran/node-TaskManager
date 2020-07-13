require("./db/mongoose");
const dotenv = require("dotenv");

const multer = require("multer");
const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();


// Middle ware example
app.use((req, res, next) => {
  // console.log({ req });
  console.log(req.method, req.path)
  next()
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, (params) => {
  console.log("Listening on port " + port);
});

// ✍️ Relationships between Users & Tasks

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

// ✍️ Use JWT to create tokens with data
// const jwt = require("jsonwebtoken");
// const myFunction = () => {
//   const token = jwt.sign({ _id: "abc123" }, "this is my secret", {
//     expiresIn: "7 days",
//   });
//   const payload = jwt.verify(token, "this is my secret");

//   console.log({ token, payload });
// };

// myFunction();

// ✍️ Image Upload
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000
//   }
// });

// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send();
// });
