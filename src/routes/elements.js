const express = require("express");
const router = express.Router();

const { createElement, getAllElements } = require("../controllers/elements");

router.post("/", createElement);

router.get("/", getAllElements);

module.exports = router;
