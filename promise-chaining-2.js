require("./src/db/mongoose");
const Task = require("./src/models/task");

// Task.findByIdAndDelete("5e156cfc43613407cac9676d")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({completed: false})
//   })
//   .then(result => {
//     console.log(result)
//   })
//   .catch(e => {
//     console.log(e)
//   });

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count
};

deleteTaskAndCount("5e1571f6f58fd20c6780130f")
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
