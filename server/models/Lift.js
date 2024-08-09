const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const LiftSchema = new mongoose.Schema({
    owner: {
      //ObjectId lets us populate data
      type: mongoose.Types.ObjectId,
      // this is the model
      ref: "User",
      // can prove to be buggy if there is data in the database
      required: true,
    },    
    movement: { type: mongoose.Schema.Types.ObjectId, ref: "Movement" },
    weight: {type: Number},
    difficulty: {type: Number},
    date: {type: String},
    notes: {type: String}
  },
  {
    timestamps: true,
  });

const Lift = mongoose.model("Lift", LiftSchema)

module.exports = Lift