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
// router.delete("/all", requireToken, async (req, res, next) => {
//     try {
//         handleValidateOwnership(req, await Comment.findById(req.params.id));
//         const deletedComment = await Comment.findByIdAndDelete(req.params.id);
//         console.log("deleted comment: ", deletedComment)
//         res.status(200).json(deletedComment);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });

router.delete("/:entryId/comments/:commentId", requireToken, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    console.log("deleted comment: ", comment)
    res.status(200).json(deletedComment);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  router.get("/:entryId/all", requireToken, async (req, res) => {
    try {
      const entry = await Entry.findById(req.params.entryId).populate("comments");
  
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
  
      return res.status(200).json({ comments: entry.comments });
    } catch (error) {
      return next(error);
    }
  });


module.exports = router;
