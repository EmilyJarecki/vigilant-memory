const mongoose = require("mongoose");
const Lift = require("./Lift")

const MovementSchema = new mongoose.Schema({
  move: {type: String, required: true},
  entries: [Lift.schema]
},{timestamps: true});

const Movement = mongoose.model("Movement", MovementSchema);
module.exports = Movement