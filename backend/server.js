require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// ✅ FINAL CORS CONFIG (WORKS LOCAL + DEPLOY)
app.use(cors({
  origin: [
    "http://localhost:3000",                 // local frontend
    "https://team-task-manager.vercel.app"   // <-- change if your frontend deployed URL is different
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/tasks", require("./routes/task"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// START SERVER
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB ERROR:", err);
    process.exit(1);
  }
})();