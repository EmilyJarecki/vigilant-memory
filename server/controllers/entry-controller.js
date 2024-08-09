const express = require('express')
const router = express.Router()
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { Entry } = require("../models/lib");

router.get('/', async (req, res) => 
    { 
        try 
        {
            const entry = await Entry.find({})
            .populate('category_id').populate('owner', '-_id')
            .exec()
            res.status(200).json(entry)
        } catch (error) 
        {
            return next(error)
        }
    });


module.exports = router;