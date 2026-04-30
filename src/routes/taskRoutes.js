const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { assignTask } = require("../controllers/taskController");
const { createTask } = require("../controllers/taskController");
const { updateTaskStatus } = require("../controllers/taskController");
const { getProjectTasks } = require("../controllers/taskController");



router.post("/", auth, createTask);
router.post("/assign", auth, assignTask);
router.patch("/status", auth, updateTaskStatus);
router.get("/:projectId", auth, getProjectTasks);




module.exports = router;