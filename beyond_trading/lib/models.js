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
    try {
      const {
        rows
      } = await db.query(query, [latestPrice, shares, symbol, companyName, 'testUser']);
      return rows[0];

    } catch (err) {
      res.status(500).send(err);
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
      res.status(500).send(err);
    }
  }
};