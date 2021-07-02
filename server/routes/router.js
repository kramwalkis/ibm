const express = require("express");
const router = express.Router();
const model = require("../models/main");
const middle = require("../middle/middleWare");

router.post('/addSearchQuery', 
middle.searchQueryValidation,
model.addSearchQuery)

module.exports = router