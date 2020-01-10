const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    completed: {
      type: Boolean,
      default: false
    },
    description: {
      trim: true,
      type: String,
      required: true
    },
    owner: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

taskSchema.pre("save", async function(next) {
  const task = this;
  if (task.isModified("password")) {
    // user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

// const task = new Task({ description: "Complete challenge" });

// task
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(error => {
//     console.log(error);
//   });

module.exports = Task;
