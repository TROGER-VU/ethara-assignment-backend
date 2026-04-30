const pool = require("../config/db");

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
