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