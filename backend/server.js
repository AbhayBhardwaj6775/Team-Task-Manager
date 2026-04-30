require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// ✅ SIMPLE & SAFE CORS
app.use(cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/tasks", require("./routes/task"));

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// START SERVER
const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});