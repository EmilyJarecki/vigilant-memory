const express = require("express");
const router = express.Router();
const { User } = require("../models/lib");
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

// Route to get the name of the authenticated user
// requires authorization
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ username: loggingUser });
    const userId = req.user._id;
    const user = await User.findById(userId).select("name");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ name: user.name });
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

// get all users except oneself
router.get("/stranger/:userId", async (req, res, next) => {
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









module.exports = router;
