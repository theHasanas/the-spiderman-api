const express = require("express");
const router = express.Router();

const { attemptLogin } = require("../controllers/login");

router.get("/", attemptLogin);

module.exports = router;
