require("dotenv").config();

const env = {
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  JWT_SECRET: process.env.JWT_SECRET,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: Number(process.env.DB_PORT || 3306),
};

if (!env.JWT_SECRET) throw new Error("Missing JWT_SECRET in .env");
if (!env.DB_HOST || !env.DB_USER || !env.DB_NAME) {
  throw new Error("Missing DB env vars (DB_HOST/DB_USER/DB_NAME)");
}

module.exports = { env };