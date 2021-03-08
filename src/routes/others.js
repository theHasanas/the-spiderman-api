const express = require("express");
const router = express.Router();

router.put("/title/:newTitle", (request, response) => {
  const newTitle = request.params.newTitle;

  if (newTitle === "Marvel is Awesome" || newTitle === "Marvel is Cool") {
    response.status(400).end();
  } else {
    title = newTitle;
    response.status(204).end();
  }
});

router.get("/secret", (_, response) => {
  response.send("Marvel Sucks");
});

router.get("/tas", (_, response) => {
  response.send({ bestTA: "Salwa", secondBestTA: "Abdulghaphor" });
});

module.exports = router;
