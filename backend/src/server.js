// src/server.js
const app = require("./app");
const { env } = require("./utils/env");

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});