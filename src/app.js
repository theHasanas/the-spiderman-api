const express = require("express");
const cors = require("cors");
// import routers
const loginRoutes = require("./routes/login");

const app = express();

app.use(cors());
app.use(express.json());

let title = "Spiderman API";
const pageElements = [{ tag: "button", value: "Click me!" }];

app.get("/", (_, response) => {
  let html = `<h1>${title}</h1>`;

  pageElements.forEach((element) => {
    html = html + `\n<${element.tag}>${element.value}</${element.tag}>`;
  });

  response.status(200).send(html);
});

app.use(loginRoutes);

app.post("/elements", (request, response) => {
  const elements = request.body.elements;

  try {
    elements.forEach((element) => {
      pageElements.push({ tag: element.tag, value: element.value });
    });

    response.status(201).end();
  } catch (error) {
    if (error.name === "TypeError") {
      console.error(
        `Failed to create elements: learn to type correctly, you idiot!`
      );
    }
    response.status(400).json({ error: error.message });
  }
});

app.get("/elements", (_, response) => {
  response.status(200).send(pageElements);
});

app.put("/title/:newTitle", (request, response) => {
  const newTitle = request.params.newTitle;

  if (newTitle === "Marvel is Awesome" || newTitle === "Marvel is Cool") {
    response.status(400).end();
  } else {
    title = newTitle;
    response.status(204).end();
  }
});

app.get("/secret", (_, response) => {
  response.send("Marvel Sucks");
});

app.get("/tas", (_, response) => {
  response.send({ bestTA: "Salwa", secondBestTA: "Abdulghaphor" });
});

app.listen(8000, () => {
  console.log("Server up and running on port 8000.");
  console.log("You can connect using http://localhost:8000");
});
