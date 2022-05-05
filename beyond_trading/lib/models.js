const db = require('./');

module.exports = {
  addTransaction: async ({
    companyName,
    latestPrice,
    shares,
    symbol,
  }) => {
    const query = `
      WITH a as (
        SELECT id FROM users
        WHERE username=$5
        )
      INSERT INTO transactions (price, shares, symbol, companyName, user_id)
      VALUES($1, $2, $3, $4, (SELECT id from a))
      RETURNING id
    `;
    const {
      rows
    } = await db.query('SELECT cash FROM users WHERE id=1')
    const cashBeforeUpdate = rows[0].cash;
    const updatedCash = Number(cashBeforeUpdate.replace(/[^0-9.-]+/g, '')) - Number(latestPrice) * parseInt(shares)
    const cashQuery = `
      UPDATE users
      SET cash = $1
      WHERE id = 1
    `;
    try {
      await db.query(cashQuery, [updatedCash]);
      const {
        rows
      } = await db.query(query, [latestPrice, shares, symbol, companyName, 'testUser']);
      return rows[0];

    } catch (err) {
      console.log(err);
    }
  },
  sellTransaction: async ({
    companyName,
    latestPrice,
    shares,
    symbol,
  }) => {
    const query = `
      WITH a as (
        SELECT id FROM users
        WHERE username=$5
        )
      INSERT INTO transactions (price, shares, symbol, companyName, user_id)
      VALUES($1, $2, $3, $4, (SELECT id from a))
      RETURNING id
    `;
    try {
      const {
        rows
      } = await db.query(query, [latestPrice, shares, symbol, companyName, 'testUser']);
      return rows[0];

    } catch (err) {
      console.log(err);
    }
  },
  listTransactions: async () => {
    const query = `
      SELECT price, shares, symbol, companyname
      FROM transactions
      WHERE user_id = 1
    `;
    const cashquery = `
      SELECT cash
      FROM users
      WHERE username = 'testUser'
    `;
    try {
      const result = await db.query(cashquery);
      const currentCash = result.rows[0].cash
      const {
        rows
      } = await db.query(query);
      const data = {
        transactions: rows,
        currentCash
      }
      return data;

    } catch (err) {
      console.log(err);
    }
  },

  getUserCash: async () => {
    const query = `
      SELECT cash
      FROM users
      WHERE username = 'testUser'
    `;
    try {
      const {
        rows
      } = await db.query(query);
      return rows;
    } catch (err) {
      console.log(err);
    }
  },

};