const express = require("express");
const router = express.Router();
const { Fruit } = require("../models/lib");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

const db = require("../models/lib");

// get all posts wityh correct authorization token
router.get("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    const allFruits = await Fruit.find({ owner }).populate(['owner']).exec()
    res.status(200).json(allFruits);
    console.log(allFruits);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// create a fruit posting
// require token working
router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    console.log(owner, req.user);
    req.body.owner = owner;
    const fruitPost = await Fruit.create(req.body);
    res.status(201).json(fruitPost);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// updates a post
// require working
router.put("/:entryId", requireToken, async (req, res, next)=>{
	try {
		const updatedEntry = await Fruit.findByIdAndUpdate(req.params.entryId, req.body)
		console.log(updatedEntry)
		res.status(200).json({message: "Successfully updated product", updatedEntry})
	} catch (error) {
		res.status(400).json({error: "error"})
		return next(err)
	}
})

// deletes an entry
// require working
router.delete("/:entryId", requireToken, async (req, res, next) => {
	console.log(req.params)
  try {
    const deletedEntry = await Fruit.findByIdAndDelete(req.params.entryId);
    console.log(deletedEntry);
    res
      .status(200)
      .json({ message: "Successfully deleted product", deletedEntry });
  } catch (error) {
    res.status(400).json({ error: "error" });
    return next(error);
  }
});

module.exports = router;
