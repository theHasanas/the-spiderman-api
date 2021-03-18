const express = require("express");
const cors = require("cors");
const path = require("path");

// import database stuff
const db = require("./src/db/models");
const { Student, University } = require("./src/db/models");
// import routers
const homeRoutes = require("./src/routes/home");
const loginRoutes = require("./src/routes/login");
const elementsRoutes = require("./src/routes/elements");
const otherRoutes = require("./src/routes/others");

// initialise app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// media
app.use("/media", express.static(path.join(__dirname, "media")));

// app.post("/media", upload.single("image"), (request, response) => {
//   console.log(request.file.name);
//   console.log(request.body);
//   response.end();
// });

// routes
app.use("/", homeRoutes);
app.use("/signin", loginRoutes);
app.use("/elements", elementsRoutes);
app.use(otherRoutes);

const studentObjectOptions = {
  attributes: { exclude: ["createdAt", "updatedAt", "universityId"] },
  include: {
    model: University,
    as: "university",
    attributes: { exclude: ["createdAt", "updatedAt"] },
  },
};

app.get("/students", async (_, response) => {
  try {
    const students = await Student.findAll(studentObjectOptions);
    console.log("Fetched students", students);
    response.status(200).json(students);
  } catch (error) {
    console.log("Failed to fetch all students:", error);
  }
});

app.get("/students/:studentId", async (request, response) => {
  try {
    const student = await Student.findByPk(
      request.params.studentId,
      studentObjectOptions
    );
    console.log("Fetched student", student);
    response.status(200).json(student);
  } catch (error) {
    console.log("Failed to fetch student:", error);
  }
});

app.post("/students", async (request, response) => {
  try {
    const university = await University.findOne({
      where: {
        name: request.body.university,
      },
    });

    const newStudent = await Student.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      universityId: university.id,
    });

    console.log("Created student", newStudent);
    response.status(201).json(newStudent);
  } catch (error) {
    console.log("Failed to create new student:", error);
  }
});

app.get("/universities", async (_, response) => {
  try {
    const universities = await University.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Student,
        as: "students",
        attributes: { exclude: ["createdAt", "updatedAt", "universityId"] },
      },
    });
    console.log("Fetched universities", universities);
    response.status(200).json(universities);
  } catch (error) {
    console.log("Failed to fetch all universities:", error);
  }
});

app.post("/universities", async (request, response) => {
  try {
    const newUniversity = await University.create({
      name: request.body.name,
      country: request.body.country,
    });

    console.log("Created university", newUniversity);
    response.status(201).json(newUniversity);
  } catch (error) {
    console.log("Failed to create new university:", error);
  }
});

app.post(
  "/universities/:universityId/students",
  async (request, response) => {}
);

// start express app
const run = async () => {
  try {
    // await db.sequelize.sync({ force: true });
    await db.sequelize.sync();
    console.log("Server connected to database successfully.");

    app.listen(8000, () => {
      console.log("Server up and running on port 8000.");
      console.log("You can connect using http://localhost:8000");
    });
  } catch (error) {
    console.log("Failed to connect to database:", error);
  }
};

run();
