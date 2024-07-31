const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const FruitSchema = new mongoose.Schema({
    owner: {
      //ObjectId lets us populate data
      type: mongoose.Types.ObjectId,
      // this is the model
      ref: "User",
      // can prove to be buggy if there is data in the database
      required: true,
    },    
    fruit: {type: String, required: true},
    subFruit: {type: String},
    rating: {type: Number},
    season: {type: String},
    explanation: {type: String},
    image: {type: String}
  },
  {
    timestamps: true,
  });

const Fruit = mongoose.model("Fruit", FruitSchema)

module.exports = Fruit