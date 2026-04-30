const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createProject, addMember } = require("../controllers/projectController");
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Test Project
 *             description: Sample project
 *     responses:
 *       200:
 *         description: Project created
 */
router.post("/", auth, createProject);

/**
 * @swagger
 * /projects/add-member:
 *   post:
 *     summary: Add member to project (Admin only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             projectId: PROJECT_ID
 *             userId: USER_ID
 *     responses:
 *       200:
 *         description: Member added
 */
router.post("/add-member", auth, projectAdmin, addMember);


module.exports = router;