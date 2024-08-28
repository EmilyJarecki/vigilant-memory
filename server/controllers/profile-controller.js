const express = require("express");
const router = express.Router();
const { User } = require("../models/lib");
const { requireToken } = require("../middleware/auth");

// gets exterior user
router.get("/other/:id", requireToken, async (req, res, next) => {
  try {
    const individual = await User.findById(req.params.id);
    console.log(individual);
    res.status(200).json(individual);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// adds friends
router.post("/add-friend", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const friendId = req.body.friendId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    // Check if both user and friend exist
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    // Check if the friend is already in the user's friends list
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }
    user.friends.push(friendId);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Friend added successfully", user });
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// get list of users friends
router.get("/friends", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "friends",
      "username firstName lastName"
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the friends' profiles
    return res.status(200).json({
      message: "Friends retrieved successfully",
      friends: user.friends,
    });
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

module.exports = router;
