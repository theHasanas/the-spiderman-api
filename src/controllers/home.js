const { title, pageElements } = require("../data");

exports.getHomePage = (_, response) => {
  let html = `<h1>${title}</h1>`;

  pageElements.forEach((element) => {
    html = html + `\n<${element.tag}>${element.value}</${element.tag}>`;
  });

  response.status(200).send(html);
};
