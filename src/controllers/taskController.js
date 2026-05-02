const pool = require("../config/db");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      priority,
      due_date,
    } = req.body;

    const createdBy = req.user.id;
    const assignedTo = req.user.id; // 👈 YOUR DECISION

    const result = await pool.query(
      `INSERT INTO tasks 
      (title, description, project_id, assigned_to, created_by, priority, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        title,
        description,
        projectId,
        assignedTo,
        createdBy,
        priority,
        due_date,
      ]
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
      `SELECT 
         t.*, 
         u.name AS assigned_name
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       WHERE t.project_id = $1`,
      [projectId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM tasks WHERE assigned_to = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET MY TASKS ERROR:", err); // 👈 IMPORTANT

    res.status(500).json({
      error: "Fetch failed",
      message: err.message
    });
  }
};

exports.getOverdueTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM tasks
       WHERE assigned_to = $1
       AND due_date < NOW()
       AND status != 'done'`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.getProjectStats = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'todo') AS todo,
        COUNT(*) FILTER (WHERE status = 'in-progress') AS in_progress,
        COUNT(*) FILTER (WHERE status = 'done') AS done
       FROM tasks
       WHERE project_id = $1`,
      [projectId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stats failed" });
  }
};