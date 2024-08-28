const express = require("express");
const router = express.Router();
const { User, Entry } = require("../models/lib");
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
router.post("/add-friend/:friendId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId;

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

// deletes friends
router.delete("/remove-friend/:friendId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId;
    const user = await User.findById(userId);

    // Check if the friend exists in the user's friends list
    const friendIndex = user.friends.indexOf(friendId);
    if (friendIndex === -1) {
      return res
        .status(400)
        .json({ message: "Friend not found in the friends list" });
    }

    // Remove the friend from the friends list
    user.friends.splice(friendIndex, 1);

    // Save the updated user document
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// get all entries from other user
router.get("/all-posts/:friendId", async (req, res) => {
  try {
    const friendId = req.params.friendId;
    console.log(friendId);
    const post = await Entry.find({ owner: friendId })
      .populate("owner", "username -_id")
      .exec();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the entries." });
  }
});

// get the individual friends' entry can be found at URL/entry/individual/:id

// get all user posts from a single category // working
router.get("/entry-by-category/:friendId/:categoryId", requireToken, async (req, res) => {
  try {
    const {friendId, categoryId} = req.params;
    const entry = await Entry.find({
      owner: friendId,
      category_id: categoryId,
    })
      .populate("owner", "username -_id")
      .exec();
    console.log(entry);
    res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the entries." });
  }
});

// filters friends' lifts by categories and reps
router.get("/entry-by-category/:friendId/:categoryId/:filterNum", requireToken, async (req, res) => {
  try {
    const {friendId, categoryId, filterNum} = req.params;
    console.log("filterNum", filterNum)
    const entries = await Entry.find({
      owner: friendId,
      category_id: categoryId,
    })
      .populate("owner", "username -_id")
      .exec();

    const filteredEntries = entries.filter(entry => parseInt(entry.reps) == filterNum);
    console.log("filtered entries: ", filteredEntries)
    res.status(200).json(filteredEntries);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while filtering the entries." });
  }
});

module.exports = router;

