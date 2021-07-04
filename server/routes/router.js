const express = require("express");
const router = express.Router();
const model = require("../models/main");
const middle = require("../middle/middleWare");

router.post(
  "/addSearchQuery",
  middle.searchQueryValidation,
  model.addSearchQuery
);

router.post(
  "/addSearchedArticle",
  middle.checkArticleValidity,
  model.addNewArticle
);

module.exports = router;
