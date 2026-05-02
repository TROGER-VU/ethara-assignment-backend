const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");

// GET all users
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(
    "SELECT u.id, u.name, u.email FROM users u WHERE u.id NOT IN (SELECT user_id FROM project_members WHERE project_id = $1)",
    [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch users failed" });
  }
});

module.exports = router;