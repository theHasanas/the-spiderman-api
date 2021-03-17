const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const { createElement, getAllElements } = require("../controllers/elements");

router.post("/", upload.single("image"), createElement);

router.get("/", getAllElements);

module.exports = router;
