const express = require("express");
const router = express.Router();

const { assignTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

// SIMPLE VERSION (no RBAC yet)
router.post("/assign", auth, assignTask);

module.exports = router;