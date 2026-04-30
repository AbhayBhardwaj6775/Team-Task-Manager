require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// ✅ CORS (open for now)
app.use(cors({
  origin: true,
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/tasks", require("./routes/task"));

// ROOT TEST
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ✅ IMPORTANT FIX FOR RAILWAY
const PORT = process.env.PORT;

// 🚨 FAIL FAST if PORT missing
if (!PORT) {
  console.error("❌ PORT is missing!");
  process.exit(1);
}

// START SERVER
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    process.exit(1);
  }
})();