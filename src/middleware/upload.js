const multer = require("multer");
const slugify = require("slugify");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (request, file, nameFile) => {
    nameFile(
      null,
      `${slugify(request.body.name.toLowerCase() + Date.now())}.${
        file.originalname.split(".")[1]
      }`
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
