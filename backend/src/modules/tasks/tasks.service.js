const { env } = require("../../utils/env");
const HttpError = require("../../utils/httpError");
const db = require("../../db/migrations/client");

async function getTasksByUser(userId) {
  if (!userId) {
    throw new HttpError(400, "User_id is required");
  }

  const [rows] = await db.query(
    "SELECT id, title, description, completed_at, created_at, updated_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
  );

  return { tasks: rows };
}

async function deleteTaskById(userId, tasksId) {
  if (!userId) {
    throw new HttpError(400, "User_id is required");
  }

  const ids = Array.isArray(tasksId) ? tasksId : [tasksId];

  const cleanIds = ids
    .map((x) => Number(x))
    .filter((x) => Number.isInteger(x) && x > 0);

  if (cleanIds.length === 0) {
    throw new HttpError(400, "Task_id is required");
  }

  for (const id of cleanIds) {
    const [result] = await db.query(
      "Delete from tasks Where id = ? AND user_id = ?",
      [id, userId],
    );

    deletedCount = result.affectedRows || 0;
  }

  return { deletedCount };
}

module.exports = { getTasksByUser, deleteTaskById };
