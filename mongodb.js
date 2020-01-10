// CRUD using MongoDB examples
const mongodb = require("mongodb");

const { ObjectID, MongoClient } = mongodb;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the database.");
    }

    const db = client.db(databaseName);



    // ✍️📚 Insert one document.
    db.collection("users").insertOne({ name: "Loi", age: 32 });

    // ✍️📚 Insert many documents.
    // db.collection("users").insertMany(
    //   [
    //     {
    //       age: 18,
    //       name: "Charles"
    //     },
    //     {
    //       age: 32,
    //       name: "PrimeTimeTran"
    //     }
    //   ],
    //   (error, result) => {
    //     console.log(result.ops);
    //   }
    // );

    // ✍️📚 Insert many tasks.
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "MongoDb Course",
    //       completed: false
    //     },
    //     {
    //       description: "React Native Course",
    //       completed: false
    //     },
    //     {
    //       description: "React.JS Course",
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     console.log(result.ops);
    //   }
    // );

    // ✍️📚 Find a document via _id. Remember ObjectID is required.
    // db.collection("users").findOne(
    //   { _id: ObjectID("5e1555f32673ff7fb9862f77") },
    //   (error, doc) => {
    //     if (error) {
    //       return console.log("Unable to find user");
    //     }
    //     console.log(doc);
    //   }
    // );

    // ✍️📚 Find many documents via a field. Grab all documents into an array.
    // db.collection("users")
    //   .find({ age: 32 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // ✍️📚 Find many documents. Grab only the number of documents where the field
    // matches the query.
    // db.collection("users")
    //   .find({ age: 32 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection("tasks").findOne(
    //   { _id: ObjectID("5e1554710b81317f3f03049a") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("Task not found");
    //     }
    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: ObjectID("5e1555f32673ff7fb9862f77")
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
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
    //       completed: true
    //     },
    //     {
    //       $set: {
    //         completed: false
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // ✍️📚 Delete many documents
    // db.collection("users")
    //   .deleteMany({
    //     name: "Charles"
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
