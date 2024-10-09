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
      entry: req.params.entryId,
    });

    await comment.save();

    const entry = await Entry.findById(req.params.entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    entry.comments.push(comment);
    await entry.save();

    console.log(comment)
    return res
      .status(200)
      .json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:entryId/:commentId/delete", requireToken, async (req, res, next) => {
    try {
      const entry = await Entry.findByIdAndUpdate(
        req.params.entryId,
        {
          $pull: { comments: req.params.commentId },
        },
        { new: true }
      );
      if (!entry) {
        return res.status(400).send("entry not found");
      }
      const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
      res.status(200).json(deletedComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get("/:entryId/all", requireToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId).populate("comments").exec();
    console.log(entry)
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ comments: entry.comments });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
