const pool = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.body; // used by add-member

    const result = await pool.query(
      `SELECT role FROM project_members
       WHERE user_id = $1 AND project_id = $2`,
      [userId, projectId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Not a project member" });
    }

    if (result.rows[0].role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Admin check failed" });
  }
};