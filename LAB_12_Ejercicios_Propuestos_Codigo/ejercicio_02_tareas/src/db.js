const fs = require('node:fs');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
  connectionLimit: 5,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8'),
    rejectUnauthorized: true,
    verifyIdentity: true
  }
});

module.exports = pool;
