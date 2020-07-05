// CRUD using MongoDB examples
const mongodb = require("mongodb");

const { ObjectID, MongoClient } = mongodb;

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

// // The id is shorter because it's binary.
// console.log(id.id.length)
// // If it's a string, it becomes heavier.
// console.log(id.toHexString().length)

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

function handleCallback(error, result) {
  if (error) {
    return console.log("Error: ", error);
  }
  if (result && result.ops) {
    console.log(result.ops);
  } else {
    console.log(result);
  }
}

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the database.");
    }

    console.log("Connected correctly!");

    const db = client.db(databaseName);

    // ✍️📚 Insert one document. The 2nd argument is the handler.
    // db.collection("users").insertOne({
    //   age: 32,
    //   name: "Loi",
    //   email: "loi@gmail.com",
    // }, handleCallback);

    // ✍️📚 Insert many documents. Also takes a 2nd argument.
    // db.collection("users").insertMany(
    //   [
    //     {
    //       age: 18,
    //       name: "Charles",
    //       email: "charles@coderschool.vn",
    //     },
    //     {
    //       age: 32,
    //       name: "PrimeTimeTran",
    //       email: "loi@coderschool.vn",
    //     },
    //   ],
    //   handleCallback
    // );

    // ✍️📚 Insert many documents.
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Complete Node.JS Course",
    //       completed: false,
    //     },
    //     {
    //       description: "Complete React Native Animations",
    //       completed: false,
    //     },
    //     {
    //       description: "Complete MongoDB certification",
    //       completed: false,
    //     },
    //   ],
    //   handleCallback
    // );

    // ✍️📚 Find a document via _id. ObjectID produces a buffer, how the data is actually stored; how we need to query.
    // db.collection("users").findOne(
    //   { _id: ObjectID("5f01879b076440f2bf399ad8") },
    //   handleCallback
    // );

    // ✍️📚 Find many documents via field & query for the documents.
    // db.collection("users").find({ age: 32 }).toArray(handleCallback);

    // ✍️📚 Find many documents via a field & count the number of documents.
    // db.collection("users").find({ age: 32 }).count(handleCallback);

    // db.collection("tasks").findOne({ _id: ObjectID("5f01acc5d6f3570a74346538") }, handleCallback);
    // db.collection("tasks").find({ completed: false }).toArray(handleCallback);

    // ✍️📚 Find many documents. Grab only the number of documents where the field
    // matches the query.
    // db.collection("users")
    //   .find({ age: 32 })
    //   .count(handleCallback);

    // db.collection("tasks").findOne(
    //   { _id: ObjectID("5e1554710b81317f3f03049a") },
    //   handleCallback
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray(handleCallback);

    // ✍️📚 Find a specific document to update. Use an update operator to define what value we want to update.
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: ObjectID("5f01879b076440f2bf399ad8")
    //     },
    //     {
    //       $set: {
    //         name: 'Big D C Charles'
    //       }
    //       // $inc: {
    //       //   age: 1
    //       // }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // ✍️📚 Update many documents
    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // ✍️📚 Delete many documents
    // db.collection("users")
    //   .deleteMany({
    //     email: "loi@gmail.comss"
    //   })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // ✍️📚 Delete one documents
    // db.collection("users")
    //   .deleteOne({
    //     name: "PrimeTimeTran"
    //   })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
);
