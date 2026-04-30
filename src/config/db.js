const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: {
    rejectUnauthorized: false, // required for Railway
  },
});

module.exports = pool;