const express = require("express");
const cors = require("cors");
const { env } = require("./utils/env.js");

// Middleware to limit requests
const rateLimit = require("./middlewares/rateLimit.js");
// Middleware to transform errors to responses JSON
const errorHandler = require("./middlewares/errorHandler.js");
// Import the routers for each feature
const authRouter = require("./modules/auth/auth.routes.js");
const tasksRouter = require("./modules/tasks/tasks.routes.js");
const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: false,
  }),
);

app.use(express.json({ limit: '1mb'}));
app.use("/api/auth", rateLimit, authRouter);
app.use("/api/tasks", tasksRouter);

app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

app.use((req, res) => {
    res.status(404).json({ error: { message: 'Route not found' }});
});

// Error handler centralized
app.use(errorHandler);

module.exports = app;