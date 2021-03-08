const { pageElements } = require("../data");

exports.createElement = (request, response) => {
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
};

exports.getAllElements = (_, response) => {
  response.status(200).send(pageElements);
};
