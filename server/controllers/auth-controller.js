const express = require("express");
const router = express.Router();
const { User, Entry } = require("../models/lib");
const { requireToken } = require("../middleware/auth");
const { createUserToken } = require("../middleware/auth");
const bcrypt = require("bcrypt");

// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    //1. create salt (make password a hash)
    // (10) = 10 cycles of hashing, the reccommended amount
    const salt = await bcrypt.genSalt(10);
    //2. create the password hash from req.body.password
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const rawPWStore = req.body.password;

    req.body.password = passwordHash;

    const newUser = await User.create(req.body);

    if (newUser) {
      req.body.password = rawPWStore;
      const authenticatedUserToken = createUserToken(req, newUser);
      console.log(authenticatedUserToken);
      res.status(201).json({
        user: newUser,
        isLoggedIn: true,
        token: authenticatedUserToken,
      });
    } else {
      res.status(400).json({ err: "Something went very wrong" });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const loggingUser = req.body.username;

    const foundUser = await User.findOne({ username: loggingUser });
    console.log(foundUser);
    const token = await createUserToken(req, foundUser);
    console.log(token);
    // token is required in response to authenticate our current user
    // token will be sent with every request to protected/authoriezed route
    console.log(foundUser);
    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      isLoggedIn: true,
      token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// all profiles would be /auth/profiles in postman
router.get("/profiles", async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
    console.log(allUsers);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// Route to get authenticated user
router.get("/self", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// get all users except oneself
router.get("/filtered/:userId", requireToken, async (req, res, next) => {
  try {
        const { userId } = req.params;

        // Find all users
        const allUsers = await User.find({});
    
        // Filter out the user with the specified userId
        const filteredUsers = allUsers.filter(user => user._id.toString() !== userId);
    
        // Send the filtered list of users
        res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// filters users' lifts by categories and reps
router.get("/filtered-category/:categoryId/:filterNum", requireToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId, filterNum} = req.params;

    console.log("filterNum", filterNum)

    const entries = await Entry.find({
      owner: userId,
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

router.put("/update", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;

        const updatedProfile = await User.findByIdAndUpdate(
          userId,
          req.body,
          { new: true }
        )
        res.status(200).json(updatedProfile)
        
        res.status(200).json();
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// get list of users friends
router.get("/friends", requireToken, async (req, res, next) => {
  try {
    // Extract user ID from the token
    const userId = req.user._id;

    // Find the user and populate their friends
    const user = await User.findById(userId).populate(
      {
        path: 'friends',
        select: 'username firstName lastName' // Adjust fields as needed
      }
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the friends' profiles
    return res.status(200).json({
      message: "Friends retrieved successfully",
      friends: user.friends
    });
  } catch (err) {
    console.error('Error:', err); // Log the error for debugging
    res.status(400).json({ error: "Error retrieving friends" });
    return next(err);
  }
});

// remove a friend
router.delete("/remove-friend/:friendId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId;

    // Find the user
    const user = await User.findById(userId);

    // Check if the friend exists in the user's friends list
    const friendIndex = user.friends.findIndex(f => f._id.toString() === friendId);
    if (friendIndex === -1) {
      return res.status(400).json({ message: "Friend not found in user's friends list" });
    }

    // Remove the friend from the user's friends list
    user.friends.splice(friendIndex, 1);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Friend removed successfully", user });
  } catch (err) {
    console.error('Error:', err); // Log the error for debugging
    res.status(400).json({ error: "Error removing friend" });
    return next(err);
  }
});

module.exports = router;
