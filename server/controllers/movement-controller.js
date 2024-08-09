const express = require('express')
const router = express.Router()
const { Movement, Lift } = require("../models/lib");

// get a list of all movements 
// http://localhost:4000/movement/list
router.get("/list", async (req, res, next) => {
    try {
        const allMoves = await Movement.find({})
        console.log(allMoves)
		res.status(200).json(allMoves)
	}catch(err){
        console.log("Goodbye World")
        console.error("GET failed:", err.message);

		res.status(400).json({error: "error"})
        return next(err)
	}
});

// get individual movement

module.exports = router;
