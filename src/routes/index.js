const express = require("express");
const router = express.Router();
const token = process.env.ZIGGEO_API_TOKEN;

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Beta JS Player Ad demo" });
});

module.exports = router;
