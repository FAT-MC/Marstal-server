
// DatabaseManager.js
const { Pool } = require('pg');
const appConfig = require('../config');

class DatabaseManager {
  constructor() {
    this.pool = new Pool(appConfig.db);
  }

  async executeQuery(query, params) {
    try {
      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async executeTransaction(transactionCallback) {
    const client = await this.pool.connect();
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
}

module.exports = new DatabaseManager();
