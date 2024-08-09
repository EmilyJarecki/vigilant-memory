const mongoose = require("mongoose");
const Lift = require("./Lift")

const MoveSchema = new mongoose.Schema({
  move: {type: String, required: true},
},{timestamps: true});

const Movement = mongoose.model("Movement", MoveSchema);
module.exports = Movement