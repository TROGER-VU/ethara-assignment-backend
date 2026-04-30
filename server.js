require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const pool = require("./src/config/db");

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

const authRoutes = require("./src/routes/authRoutes");

app.use("/auth", authRoutes);

const authMiddleware = require("./src/middleware/authMiddleware");

const projectRoutes = require("./src/routes/projectRoutes");

app.use("/projects", projectRoutes);