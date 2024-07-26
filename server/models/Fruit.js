const mongoose = require("mongoose");


const FruitSchema = new mongoose.Schema({
    type: String,
    name: String,
    rating: Number,
  });

const Fruit = mongoose.model("Fruit", FruitSchema)

module.exports = Fruit