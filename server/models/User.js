const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        // remove password before it's ever sent to db
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);