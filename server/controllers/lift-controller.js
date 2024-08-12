const express = require("express");
const router = express.Router();
const { Lift, Movement } = require("../models/lib");
const { requireToken } = require("../middleware/auth");

const db = require("../models/lib");


module.exports = router;
