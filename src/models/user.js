const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: true
    },
    jobTitle: {
      type: String
    },
    password: {
      trim: true,
      minlength: 6,
      type: String,
      required: true,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Password shouldnt be 'password'");
        }
      }
    },
    email: {
      trim: true,
      unique: true,
      lowercase: true,
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email invalid.");
        }
      }
    },
    age: {
      type: Number,
      default: 18,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number.");
        }
        if (value < 18) {
          throw new Error("Must be at least 18.");
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// ✍️📚 Relationship definition

// Take my localField(_id) and look at the ref(Task).
// I'll be the foreignField(owner). The field which will have the association
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "mySecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// Define a method on a model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }

  return user;
};

// Hash plaintext password
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// ✍️📚 Delete tasks for user when a user is deleted
userSchema.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

// const loi = new User({ name: "Loi", email: "loi@coderschool.com", password: 'hi' });

// loi
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(error => {
//     console.log(error);
//   });

module.exports = User;
