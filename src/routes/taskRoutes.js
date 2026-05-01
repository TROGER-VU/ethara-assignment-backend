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
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *               - assignedTo
 *               - status
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fix login bug
 *               description:
 *                 type: string
 *                 example: Fix the authentication issue in login API
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *                 example: todo
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-10T10:00:00Z
 *               projectId:
 *                 type: string
 *                 example: PROJECT_UUID
 *               assignedTo:
 *                 type: string
 *                 example: USER_UUID
 *     responses:
 *       200:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", auth, projectAccess, createTask);

/**
 * @swagger
 * /tasks/assign:
 *   post:
 *     summary: Assign a task to a user (Admin only)
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - userId
 *               - projectId
 *             properties:
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *               projectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task assigned
 *       403:
 *         description: Admin only
 */
router.post("/assign", auth, projectAdmin, assignTask);

/**
 * @swagger
 * /tasks/status:
 *   patch:
 *     summary: Update task status (assigned user only)
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - status
 *             properties:
 *               taskId:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: done
 *     responses:
 *       200:
 *         description: Task updated
 *       403:
 *         description: Not allowed
 */
router.patch("/status", auth, updateTaskStatus);

/**
 * @swagger
 * /tasks/my-tasks:
 *   get:
 *     summary: Get tasks assigned to current user
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of user tasks
 */
router.get("/my-tasks", auth, getMyTasks);

/**
 * @swagger
 * /tasks/overdue:
 *   get:
 *     summary: Get overdue tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of overdue tasks
 */
router.get("/overdue", auth, getOverdueTasks);

/**
 * @swagger
 * /tasks/stats/{projectId}:
 *   get:
 *     summary: Get task statistics for a project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task statistics
 */
router.get("/stats/:projectId", auth, projectAccess, getProjectStats);

/**
 * @swagger
 * /tasks/{projectId}:
 *   get:
 *     summary: Get all tasks of a project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of project tasks
 */
router.get("/:projectId", auth, projectAccess, getProjectTasks);

module.exports = router;