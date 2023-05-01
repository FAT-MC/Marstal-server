require('dotenv').config();
const server = require("./src/app");
const appConfig = require("./src/config");
const port = appConfig.app.port;

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});