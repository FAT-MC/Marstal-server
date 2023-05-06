const appConfig = require("../src/config");

module.exports = {
  client: 'pg',
  connection: appConfig.db,
  migrations: {
    directory: `./migrations`,
  }
}