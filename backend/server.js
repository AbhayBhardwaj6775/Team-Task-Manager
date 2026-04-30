require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// ✅ VERY IMPORTANT: allow ALL origins (debug mode)
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/tasks", require("./routes/task"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API WORKING");
});

const PORT = process.env.PORT || 8080;

// START SERVER
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
})();