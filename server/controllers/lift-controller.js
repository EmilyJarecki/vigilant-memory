const express = require("express");
const router = express.Router();
const { Lift, Movement } = require("../models/lib");
const { requireToken } = require("../middleware/auth");

const db = require("../models/lib");

// create a lift posting
// the id is the id of the move
// require token WORKING
// http://localhost:4000/66b62b3b00d91bde680e8d2e
router.post("/:id", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    // console.log(owner, req.user);
    req.body.owner = owner;

    const move = await Movement.findById(req.params.id)
    const entryToCreate = req.body

    console.log("entryToCreate", entryToCreate)
    move.entries.push(entryToCreate)
    await move.save()
    console.log(move)
    res.status(200).json({message:"success"})
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// Route to get entries for a specific movement for only the specific user
// WORKING
// http://localhost:4000/entries/user/66b624fb00d91bde680e8d2c
router.get('/entries/user/:movementId', requireToken, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` is populated by `requireToken`
    const movementId = req.params.movementId;

    const movement = await Movement.findOne({
      _id: movementId,
      'entries.owner': userId
    });

    if (!movement) {
      return res.status(404).json({ message: 'Movement not found or no entries for this user.' });
    }

    // Extract only the entries that belong to the specific user
    const userEntries = movement.entries.filter(entry => entry.owner.toString() === userId.toString());

    res.status(200).json(userEntries);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
