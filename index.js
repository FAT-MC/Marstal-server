require('dotenv').config();
const app = require("./src/app");
const appConfig = require("./src/config");
const port = appConfig.app.port;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});