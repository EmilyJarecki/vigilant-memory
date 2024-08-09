const express = require("express");
const router = express.Router();
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { Entry } = require("../models/lib");

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
module.exports = router;
