const pool = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId || req.body.projectId;

    const result = await pool.query(
      `SELECT 1 FROM project_members
       WHERE user_id = $1 AND project_id = $2`,
      [userId, projectId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Not a project member" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Access check failed" });
  }
};