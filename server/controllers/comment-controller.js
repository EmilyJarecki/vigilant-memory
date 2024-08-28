const express = require("express");
const router = express.Router();
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { Comment, Entry } = require("../models/lib");

// create comment
router.post("/:entryId", requireToken, async (req, res, next) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      user: req.user._id,
      entry: req.params.entryId
    });

    // Save the comment
    await comment.save();

    // Add the comment to the entry
    const entry = await Entry.findById(req.params.entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    entry.comments.push(comment._id);
    await entry.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// cant get this to work :(
router.delete("/delete/:id", requireToken, async (req, res, next) => {
    try {
        handleValidateOwnership(req, await Comment.findById(req.params.id));
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        console.log("deleted comment: ", deletedComment)
        res.status(200).json(deletedComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
