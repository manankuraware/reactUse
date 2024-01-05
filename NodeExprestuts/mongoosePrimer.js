// Import the mongoose module
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/my_database";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// Defining schemas
// The code fragment below shows how you might define a simple schema. First you require() mongoose, then use 
// the Schema constructor to create a new schema instance, defining the various fields inside it in the 
// constructor's object parameter.

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date,
});

// Creating a model
// Models are created from schemas using the mongoose.model() method:

// Define schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date,
});

// Compile model from schema
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

// Schema types (fields)

// A schema can have an arbitrary number of fields — each one represents a field in the documents stored in 
// MongoDB. An example schema showing many of the common field types and how they are declared is shown below.

const schema = new Schema({
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now() },
    age: { type: Number, min: 18, max: 65, required: true },
    mixed: Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    array: [],
    ofString: [String], // You can also have an array of each of the other types too.
    nested: { stuff: { type: String, lowercase: true, trim: true } },
});

// Validation

// Mongoose provides built-in and custom validators, and synchronous and asynchronous validators. It allows you to 
// specify both the acceptable range of values and the error message for validation failure in all cases.
const breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, "Too few eggs"],
        max: 12,
        required: [true, "Why no eggs?"],
    },
    drink: {
        type: String,
        enum: ["Coffee", "Tea", "Water"],
    },
});


// Creating and modifying documents

// To create a record you can define an instance of the model and then call save() on it. 
// The examples below assume SomeModel is a model (with a single field name) that we have created from our schema.
// Create an instance of model SomeModel
const awesome_instance = new SomeModel({ name: "awesome" });

// Save the new model instance asynchronously
await awesome_instance.save();
// You can also use create() to define the model instance at the same time as you save it. Below we create just one, 
// but you can create multiple instances by passing in an array of objects.
await SomeModel.create({ name: "also_awesome" });

// You can access the fields in this new record using the dot syntax, and change the values. You have to call save() or 
// update() to store modified values back to the database.
// Access model field values using dot notation

console.log(awesome_instance.name); //should log 'also_awesome'

// Change record by modifying the fields, then calling save().
awesome_instance.name = "New cool name";
await awesome_instance.save();



// Searching for records

// You can search for records using query methods, specifying the query conditions as a JSON document. 
// The code fragment below shows how you might find all athletes in a database that play tennis, returning 
// just the fields for athlete name and age. Here we just specify one matching field (sport) but you can 
// add more criteria, specify regular expression criteria, or remove the conditions altogether to return 
// all athletes.

const Athlete = mongoose.model("Athlete", yourSchema);

// find all athletes who play tennis, returning the 'name' and 'age' fields
const tennisPlayers = await Athlete.find(
    { sport: "Tennis" },
    "name age",
).exec();
// Query APIs, such as find(), return a variable of type Query. You can use a query object to build up a query 
// in parts before executing it with the exec() method. exec() executes the query and returns a promise that 
// you can await on for the result.

// find all athletes that play tennis
const query = Athlete.find({ sport: "Tennis" });

// selecting the 'name' and 'age' fields
query.select("name age");

// limit our results to 5 items
query.limit(5);

// sort by age
query.sort({ age: -1 });

// execute the query at a later time
query.exec();

// Above we've defined the query conditions in the find() method. We can also do this using a where() function, 
// and we can chain all the parts of our query together using the dot operator (.) rather than adding them 
// separately. The code fragment below is the same as our query above, with an additional condition for the age.

Athlete.find()
    .where("sport")
    .equals("Tennis")
    .where("age")
    .gt(17)
    .lt(50) // Additional where query
    .limit(5)
    .sort({ age: -1 })
    .select("name age")
    .exec();



// Working with related documents — population

// You can create references from one document/model instance to another using the ObjectId schema field, or 
// from one document to many using an array of ObjectIds. The field stores the id of the related model. 
// If you need the actual content of the associated document, you can use the populate() method in a 
// query to replace the id with the actual data.

// For example, the following schema defines authors and stories. Each author can have multiple stories, which 
// we represent as an array of ObjectId. Each story can have a single author. The ref property tells the 
// schema which model can be assigned to this field.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const storySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "Author" },
    title: String,
});

const Story = mongoose.model("Story", storySchema);
const Author = mongoose.model("Author", authorSchema);

// We can save our references to the related document by assigning the _id value. Below we create an author, 
// then a story, and assign the author id to our story's author field.
const bob = new Author({ name: "Bob Smith" });
await bob.save();
// Bob now exists, so lets create a story
const story = new Story({
    title: "Bob goes sledding",
    author: bob._id, // assign the _id from our author Bob. This ID is created by default!
});
await story.save();

// Our story document now has an author referenced by the author document's ID. In order to get the author 
// information in the story results we use populate(), as shown below.

Story.findOne({ title: "Bob goes sledding" })
    .populate("author") // Replace the author id with actual author information in results
    .exec();



//   One schema/model per file

//   While you can create schemas and models using any file structure you like, 
//   we highly recommend defining each model schema in its own module (file), 
//   then exporting the method to create the model. This is shown below:

// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date,
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("SomeModel", SomeModelSchema);

// You can then require and use the model immediately in other files. 
// Below we show how you might use it to get all instances of the model.

// Create a SomeModel model just by requiring the module
const SomeModel = require("../models/somemodel");

// Use the SomeModel object (model) to find all SomeModel records
const modelInstances = await SomeModel.find().exec();
