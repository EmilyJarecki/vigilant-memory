const express = require("express");
const router = express.Router();
const { User } = require("../models/lib");
const { requireToken } = require("../middleware/auth");

// gets exterior user 
router.get("/other/:id", requireToken, async (req, res, next) => {
    try {
        const individual = await User.findById(req.params.id)
        console.log(individual)
        res.status(200).json(individual);
    } catch (err) {
      res.status(400).json({ error: "error" });
      return next(err);
    }
  });

module.exports = router;