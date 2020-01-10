const express = require("express");
const multer = require("multer");

const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalud updates!" });

  try {
    const user = req.user;
    updates.forEach(field => (user[field] = req.body[field]));
    await user.save();

    // ✍️📚 The findByIdAndUpdate() bypasses Mongoose(skips middleware[beforeSave])
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // ✍️📚 Uses mongoose internals to remove the user
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) return res.status(404).send();

    // ✍️📚 Uses the user we set in the auth middleware
    await req.user.remove();

    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

// ✍️📚 Image Upload

// 1. Involves limiting on size and file type.

const upload = multer({
  // Saves to file system
  // dest: "avatars",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    // Look for string that has . then doc OR doc. The string must end with with this with the $
    // \.(doc|docx)$
    // https://regex101.com/
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
    cb(undefined, false);
  }
});

router.post(
  "/users/me/avatars",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // Binary data displaying in HTML
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  // Must have this signature(4 arguments).
  // Second argument is a callback to handle uncaught errors
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatars", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (e) {
    res.send(404)
  }
})

// data:image/jpg;base64,MYBINARYFILE

module.exports = router;
