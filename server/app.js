// // bring in env variables
// require("dotenv").config(); 
// const { MONGODB_URI, PORT } = process.env;

// // require packages
// const express = require("express");
// const app = express();
// var bodyParser = require('body-parser')
// app.use(cors())
// app.use(bodyParser.json())
// const mongoose = require("mongoose");

// // connect mongodb
// mongoose
//   .connect(MONGODB_URI, {
//     // These options are no longer necessary in MongoDB Node.js Driver 4.0.0 and later because they will become defaults
//     useNewUrlParser: true, // tells Mongoose to use the new MongoDB driver's connection string parser
//     useUnifiedTopology: true, // internal refactor 
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));
 
// // create a schema
// const fruitSchema = new mongoose.Schema({
//   type: String,
//   name: String,
//   rating: Number,
// });

// // create a model with fruitSchema
// const Fruit = mongoose.model("Fruit", fruitSchema);

// // Create a new document
// const fr = new Fruit({
//   type: "Apple",
//   name: "Macintosh",
//   rating: "5",
// });
// Add the document to Collections
// fr.save().then(
//   () => console.log("One entry added"),
//   (err) => console.log(err)
// );

// app.get("/", async (req, res, next) => {
//   try {
//     const allFruit = await Fruit.find({});
//     res.status(200).json(allFruit);
//   } catch (error) {
//     res.status(400).json({ error: "error" });
//     return next(err);
//   }
// });

// app.listen(PORT, () => console.log("Server is running on PORT " + PORT));








// IMPORTS 
const express = require("express");
const app = express();

//APP DEPENDENCIES
const cors = require('cors')
const morgan = require('morgan')

// INITIALIZE .ENV VARIABLES
require("dotenv").config();
require("./config/db.connection")

const { PORT, MONGODB_URI } = process.env;

//CONTROLLER IMPORT
const fruitController = require('./controllers/fruit-controller')

//MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/', fruitController)


// LISTENER
app.listen(process.env.PORT || 4000, () => console.log(`listening on PORT ${PORT}`));