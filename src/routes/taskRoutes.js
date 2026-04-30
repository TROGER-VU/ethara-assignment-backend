const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { assignTask } = require("../controllers/taskController");
const { createTask } = require("../controllers/taskController");
const { updateTaskStatus } = require("../controllers/taskController");
const { getProjectTasks } = require("../controllers/taskController");
const { getMyTasks } = require("../controllers/taskController");
const { getOverdueTasks } = require("../controllers/taskController");
const { getProjectStats } = require("../controllers/taskController");

const projectAccess = require("../middleware/projectAccess");
const projectAdmin = require("../middleware/projectAdmin");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Fix bug
 *             projectId: PROJECT_ID
 *             assignedTo: USER_ID
 *     responses:
 *       200:
 *         description: Task created
 */
router.post("/", auth, projectAccess, createTask);

/**
 * @swagger
 * /tasks/assign:
 *   post:
 *     summary: Assign task (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             taskId: TASK_ID
 *             userId: USER_ID
 *             projectId: PROJECT_ID
 *     responses:
 *       200:
 *         description: Task assigned
 */
router.post("/assign", auth, projectAdmin, assignTask);

/**
 * @swagger
 * /tasks/status:
 *   patch:
 *     summary: Update task status (Assigned user only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             taskId: TASK_ID
 *             status: done
 *     responses:
 *       200:
 *         description: Task updated
 */
router.patch("/status", auth, updateTaskStatus);

/**
 * @swagger
 * /tasks/{projectId}:
 *   get:
 *     summary: Get tasks for a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/:projectId", auth, projectAccess, getProjectTasks);

/**
 * @swagger
 * /tasks/my-tasks:
 *   get:
 *     summary: Get tasks assigned to current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/my-tasks", auth, getMyTasks);


/**
 * @swagger
 * /tasks/overdue:
 *   get:
 *     summary: Get overdue tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of overdue tasks
 */
router.get("/overdue", auth, getOverdueTasks);

/**
 * @swagger
 * /tasks/stats/{projectId}:
 *   get:
 *     summary: Get project task statistics
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task stats
 */
router.get("/stats/:projectId", auth, projectAccess, getProjectStats);


module.exports = router;