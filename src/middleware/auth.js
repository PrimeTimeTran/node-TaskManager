const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Without middle ware: request --> run route handler
// Without middle ware: request --> do something --> run route handler
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const { _id } = jwt.verify(token, "mySecret");
    const user = await User.findOne({
      _id,
      "tokens.token": token
    });

    if (!user) throw new Error();

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send({ error: "Authentication required." });
  }
};

module.exports = auth;
