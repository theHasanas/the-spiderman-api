const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const { Student } = require("./db/models");
// import routers
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const elementsRoutes = require("./routes/elements");
const otherRoutes = require("./routes/others");
const student = require("./db/models/student");

// initialise app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", homeRoutes);
app.use("/signin", loginRoutes);
app.use("/elements", elementsRoutes);
app.use(otherRoutes);

app.get("/students", async (_, response) => {
  try {
    const students = await Student.findAll();
    console.log("Fetched students", students);
    response.status(200).json(students);
  } catch (error) {
    console.log("Failed to fetch all students:", error);
  }
});

app.post("/students", async (request, response) => {
  try {
    const newStudent = await Student.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
    });

    console.log("Created student", newStudent);
    response.status(201).json(newStudent);
  } catch (error) {
    console.log("Failed to fetch all students:", error);
  }
});

// start express app
const run = async () => {
  try {
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
