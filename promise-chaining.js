require("./src/db/mongoose");
const User = require("./src/models/user");

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: 100 });
  const count = await User.countDocuments({ age: 100 });
  return count;
};

updateAgeAndCount("5e15707d94beb80b57d21de2")
  .then(count => {
    console.log("count", count);
  })
  .catch(e => {
    console.log(e);
  });
