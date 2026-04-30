const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Ayush
 *             email: ayush@test.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: User created
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: ayush@test.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: JWT token returned
 */
router.post("/login", login);

module.exports = router;