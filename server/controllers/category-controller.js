const express = require("express");
const router = express.Router();
const { requireToken } = require("../middleware/auth");
const { Category } = require("../models/lib");

// working
// eventually will not need 
router.post("/create", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// working
router.get("/", async (req, res, next) => {
    try {
        const allCategories = await Category.find({})
		res.status(200).json(allCategories)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

module.exports = router;
