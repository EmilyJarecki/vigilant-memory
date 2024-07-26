const express = require("express");
const router = express.Router();
const { Fruit } = require('../models/lib')

const db = require('../models/lib') 

// SHOW ROUTE
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

module.exports = router