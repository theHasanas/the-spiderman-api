const express = require("express");
const router = express.Router();

router.get("/login", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  const rememberMe = request.body.rememberMe;

  if (username === "sally" && password === "i love javascript") {
    if (rememberMe) {
      response.status(200).json({ key: "29038jkndf028jad" });
    } else {
      response.status(200).end();
    }
  } else {
    response.status(401).end();
  }
});

module.exports = router;
