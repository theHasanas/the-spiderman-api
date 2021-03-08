const express = require("express");
const cors = require("cors");
// import routers
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const elementsRoutes = require("./routes/elements");
const otherRoutes = require("./routes/others");

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

// start server
app.listen(8000, () => {
  console.log("Server up and running on port 8000.");
  console.log("You can connect using http://localhost:8000");
});
