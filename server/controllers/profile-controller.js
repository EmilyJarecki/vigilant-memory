const express = require("express");
const router = express.Router();
const { User, Entry } = require("../models/lib");
const { requireToken } = require("../middleware/auth");

// gets exterior user
router.get("/:id", requireToken, async (req, res, next) => {
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

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    user.friends.push(friendId);

    await user.save();

    // Populate the friends' details after saving
    const updatedUser = await User.findById(userId).populate('friends', 'username firstName lastName');

    return res.status(200).json({ message: "Friend added successfully", user: updatedUser });
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ error: "Error adding friend" });
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

