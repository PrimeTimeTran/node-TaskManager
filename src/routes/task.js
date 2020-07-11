const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

// ✍️📚 Our tasks index is sophisticated.
// We can alter the response to the client using query parameters
// We respect Completed, Skip, Limit, Sort, CreatedAt
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = true
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  const options = {
    sort,
    skip: parseInt(req.query.skip),
    limit: parseInt(req.query.limit)
  };
  try {
    await req.user
      .populate({
        match,
        options,
        path: "tasks"
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];

  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalud updates!" });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    // const task = await Task.findById(req.params.id);
    updates.forEach(field => (task[field] = req.body[field]));
    await task.save();

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
