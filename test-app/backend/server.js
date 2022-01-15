// Ignore for now. Just use "npm run dev"
//module.exports = require("./src/server");

import app from "./src/server"

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`\nServer running... listening on port ${port}`);
});
