const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createProject, addMember, getMyProjects, getProjectById, getProjectMembers } = require("../controllers/projectController");
const projectAdmin = require("../middleware/projectAdmin");

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Task Manager
 *               description:
 *                 type: string
 *                 example: Internal project
 *     responses:
 *       200:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, createProject);

/**
 * @swagger
 * /projects/add-member:
 *   post:
 *     summary: Add a user to a project (Admin only)
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - userId
 *             properties:
 *               projectId:
 *                 type: string
 *                 example: PROJECT_UUID
 *               userId:
 *                 type: string
 *                 example: USER_UUID
 *     responses:
 *       200:
 *         description: Member added successfully
 *       403:
 *         description: Admin only
 */
router.post("/add-member", auth, projectAdmin, addMember);

router.get("/my", auth, getMyProjects);

router.get("/:projectId", auth, getProjectById);

router.get("/:projectId/members", auth, getProjectMembers);

module.exports = router;