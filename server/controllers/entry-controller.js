const express = require("express");
const router = express.Router();
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { Entry } = require("../models/lib");

// get all
router.get("/", async (req, res) => {
  try {
    const entry = await Entry.find({})
      .populate("category_id")
      .populate("owner", "-_id")
      .exec();
    res.status(200).json(entry);
  } catch (error) {
    return next(error);
  }
});

// post an entry
router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    req.body.owner = owner;

    const newEntry = await Entry.create(req.body);
    console.log(newEntry);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// edit an entry
router.put("/:id", requireToken, async (req, res) => {
  try {
    handleValidateOwnership(req, await Entry.findById(req.params.id));
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all posts relative towards user
router.get("/all", requireToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const post = await Entry.find({ owner: userId })
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

// delete a single post
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    handleValidateOwnership(req, await Entry.findById(req.params.id));
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all user posts from a single category
router.get("/:categoryId", requireToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const entry = await Entry.find({
      owner: userId,
      category_id: req.params.categoryId,
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

// individual entry
router.get("/individual/:id", requireToken, async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id)
      .populate("owner", "username -_id")
      .exec();
    console.log(entry);
    res.status(200).json(entry);
  } catch (error) {
    return next(error);
  }
});

// user is able to like others' entries
router.post("/like/:entryId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { entryId } = req.params;

    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Check if the user has already liked the entry
    if (entry.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has already liked this entry" });
    }

    // Add the user to the likes array
    entry.likes.push(userId);
    console.log(entry);
    // Save the updated entry
    await entry.save();

    return res.status(200).json({ message: "Entry liked successfully", entry });
  } catch (error) {
    console.error("Error liking entry:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// unlike a liked post
router.post("/unlike/:entryId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { entryId } = req.params;

    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

   // Check if the user has already liked the entry
   const likeIndex = entry.likes.indexOf(userId);
   if (likeIndex === -1) {
     return res.status(400).json({ message: 'User has not liked this entry' });
   }

    // Remove the user from the likes array
    entry.likes.splice(likeIndex, 1);

    // Save the updated entry
    await entry.save();

    return res.status(200).json({ message: 'Entry unliked successfully', entry });
  } catch (error) {
    console.error("Error unliking entry:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
