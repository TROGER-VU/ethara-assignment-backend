const pool = require("../config/db");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;
    const createdBy = req.user.id;

    const result = await pool.query(
      `INSERT INTO tasks (title, project_id, assigned_to, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, projectId, assignedTo, createdBy]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Create task failed" });
  }
};

// ASSIGN TASK
exports.assignTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    await pool.query(
      `UPDATE tasks SET assigned_to = $1 WHERE id = $2`,
      [userId, taskId]
    );

    res.json({ message: "Task assigned" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Assign failed" });
  }
};


// UPDATE TASK
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE tasks
       SET status = $1
       WHERE id = $2 AND assigned_to = $3
       RETURNING *`,
      [status, taskId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Not allowed" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT * FROM tasks WHERE project_id = $1`,
      [projectId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
};