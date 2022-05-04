import {
  Pool
} from 'pg';

const pool = new Pool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: 'beyondtrading',
  // port: process.env.DB_PORT,
  max: 20,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};