const path = require('path');
const appConfig = require("../../config");

module.exports = {
  client: 'pg',
  connection: appConfig.db,
  migrations: {
    directory: path.join(__dirname, "./migrations")
  }
}