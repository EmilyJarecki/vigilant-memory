const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema(
{
  category_id: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  owner: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reps:{ type: Number, required: true },
  weight: { type: Number, required: true },
  date: { type: String, required: true },
  notes: { type: String },
}, {timestamps: true})

const Entry = mongoose.model("Entry", EntrySchema)

module.exports = Entry