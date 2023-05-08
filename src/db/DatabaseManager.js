const { Pool } = require('pg');
const appConfig = require('../config');

const pool = new Pool(appConfig.db);

const executeQuery = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

const executeTransaction = async (transactionCallback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await transactionCallback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error executing transaction:', error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  executeQuery,
  executeTransaction
}
