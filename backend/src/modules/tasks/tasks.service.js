const { env } = require('../../utils/env');
const HttpError = require('../../utils/httpError');
const db = require('../../db/migrations/client');

async function getTasksByUser(userId) {
    if(!userId){
        throw new HttpError(400, "User_id is required");
    }

    const [rows] = await db.query(
        "SELECT id, title, description, completed_at, created_at, updated_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );

    return {tasks: rows};
}

module.exports = {getTasksByUser};