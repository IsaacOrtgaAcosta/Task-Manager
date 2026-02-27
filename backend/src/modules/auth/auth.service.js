const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../../utils/env');
const HttpError = require('../../utils/httpError');
const db = require("../../db/migrations/client");

async function login(email, password){
    if(!email || !password){
        throw new HttpError(400, "Email and password are required");
    }

    // Looks the user by email
    const [rows] = await db.query(
        "SELECT id, name, email, password_hash FROM users WHERE email = ?",
        [email]
    );

    const user = rows[0];

    if(!user){
        throw new HttpError(401, "Invalid credentials", "INVALID_CREDENTIALS");
    };

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if(!isMatch){
        throw new HttpError(401, "Invalid credentials", "INVALID_CREDENTIALS");
    }

    // Generate JWT
    const token = jwt.sign(
        {sub: user.id},
        env.JWT_SECRET,
        {expiresIn: "10h"}
    );
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
}

module.exports = { login};