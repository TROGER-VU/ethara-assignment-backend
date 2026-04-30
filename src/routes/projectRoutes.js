const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createProject);

module.exports = router;