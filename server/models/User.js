const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
