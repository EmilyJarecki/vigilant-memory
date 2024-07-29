const express = require("express");
const router = express.Router();
const { Fruit } = require('../models/lib')

const db = require('../models/lib') 

// get all posts
router.get("/", async (req, res, next) => {
	try {
		const allFruits = await Fruit.find({})
		res.status(200).json(allFruits)
		console.log(allFruits)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// create a fruit posting
router.post("/", async (req, res, next) => {
	try {
		const fruitPost = await Fruit.create(req.body)
		res.json(fruitPost)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// get all posts relative towards specific owner
router.get("/:ownerId", async(req, res, next) => {
	const ownerId = req.params.ownerId
	try {
		const allPosts = await Fruit.find({userId: ownerId})
		res.status(200).json(allPosts)
	} catch (error) {
		res.status(400).json({error: "error"})
        return next(err)
	}
})

// updates a post
router.put("/:entryId", async (req, res, next)=>{
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
router.delete("/:entryId", async (req, res, next)=>{
	try {
		const deletedEntry = await Fruit.findByIdAndDelete(req.params.entryId)
		console.log(deletedEntry)
		res.status(200).json({message: "Successfully deleted product", deletedEntry})
	} catch (error) {
		res.status(400).json({error: "error"})
		return next(err)
	}
})


module.exports = router