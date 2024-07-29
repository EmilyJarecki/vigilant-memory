const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const FruitSchema = new mongoose.Schema({
    userId: {type: ObjectId, required: true},
    fruit: {type: String, required: true},
    subFruit: {type: String},
    rating: {type: Number},
    explanation: {type: String}
  });

const Fruit = mongoose.model("Fruit", FruitSchema)

module.exports = Fruit