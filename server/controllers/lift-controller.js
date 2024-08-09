const express = require("express");
const router = express.Router();
const { Lift } = require("../models/lib");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

const db = require("../models/lib");

// get all posts wityh correct authorization token
router.get("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    const allLifts = await Lift.find({ owner }).populate(['owner']).exec()
    res.status(200).json(allLifts);
    console.log(allLifts);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
	try {	
		const singleLift = await Lift.findById(req.params.id).populate(['owner']).exec()
		res.status(200).json(singleLift)
		console.log(singleLift)
	}catch(error){
		res.status(400).json({error: "error"})
        return next(error)
	}
});


// create a lift posting
// require token working
router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    console.log(owner, req.user);
    req.body.owner = owner;
    const liftPost = await Lift.create(req.body);
    res.status(201).json(liftPost);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// updates a post
// require working
router.put("/:entryId", requireToken, async (req, res, next)=>{
	try {
		const updatedEntry = await Lift.findByIdAndUpdate(req.params.entryId, req.body)
		console.log(updatedEntry)
		res.status(200).json({message: "Successfully updated lift", updatedEntry})
	} catch (error) {
		res.status(400).json({error: "error"})
		return next(error)
	}
})

// deletes an entry
// require working
router.delete("/:entryId", requireToken, async (req, res, next) => {
	console.log(req.params)
  try {
    const deletedEntry = await Lift.findByIdAndDelete(req.params.entryId);
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
