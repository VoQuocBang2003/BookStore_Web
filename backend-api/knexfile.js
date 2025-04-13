require("dotenv").config();
const knex = require('knex');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

/* eslint-disable no-undef */
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const db = knex({
  client: "mysql2",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  },
  pool: { min: 0, max: 7 },
});

module.exports = db;