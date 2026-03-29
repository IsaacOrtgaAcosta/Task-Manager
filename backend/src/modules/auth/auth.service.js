const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../../utils/env");
const HttpError = require("../../utils/httpError");
const db = require("../../db/migrations/client");

async function login(email, password) {
  if (!email || !password) {
    throw new HttpError(400, "Email and password are required");
  }

  // Looks the user by email
  const [rows] = await db.query(
    "SELECT id, name, email, password_hash FROM users WHERE email = ?",
    [email],
  );

  const user = rows[0];

  if (!user) {
    throw new HttpError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new HttpError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  // Generate JWT
  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

async function logup(email, name, lastName, password) {
  if (!email || !name || !password) {
    throw new HttpError(400, "Email, name and password are required");
  }

  let fullName = "";
  if (lastName !== "") {
    fullName = name + " " + lastName;
  }

  const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

  const match = rows[0];
  if (match) {
    throw new HttpError(
      401,
      "The user exists in db",
      "INSERT A DIFFERENT EMAIL",
    );
  }

  const passwordHashed = await bcrypt.hash(password, 10);


  const [result] = await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [fullName, email, passwordHashed],
  );

  if(result.affectedRows === 1){
    const userId = result.insertId;

    return res.status(201).json({
        message: "User created succesfully",
        userId,
    });
  }else{
    return res.status(500).json({
        message: "User could not be created",
    });
  }
}

module.exports = { login, logup };
