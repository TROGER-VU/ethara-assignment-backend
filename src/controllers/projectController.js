const pool = require("../config/db");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO projects (name, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description, userId]
    );

    const project = result.rows[0];

    // Add creator as admin
    await pool.query(
      `INSERT INTO project_members (user_id, project_id, role)
       VALUES ($1, $2, 'admin')`,
      [userId, project.id]
    );

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Create project failed" });
  }
};

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    await pool.query(
      `INSERT INTO project_members (user_id, project_id)
       VALUES ($1, $2)`,
      [userId, projectId]
    );

    res.json({ message: "Member added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Add member failed" });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT p.*
       FROM projects p
       JOIN project_members pm ON p.id = pm.project_id
       WHERE pm.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch projects failed" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT * FROM projects WHERE id = $1`,
      [projectId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch project failed" });
  }
};

exports.getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT u.id, u.name, u.email, pm.role
       FROM project_members pm
       JOIN users u ON pm.user_id = u.id
       WHERE pm.project_id = $1`,
      [projectId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch members failed" });
  }
};