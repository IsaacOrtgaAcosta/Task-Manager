const { env } = require("../../utils/env");
const HttpError = require("../../utils/httpError");
const db = require("../../db/migrations/client");

async function getTasksByUser(userId) {
  if (!userId) {
    throw new HttpError(400, "User id is required");
  }

  const [rows] = await db.query(
    "SELECT id, title, description, completed_at, created_at, updated_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
  );

  return { tasks: rows };
}

async function getTaskByTaskId(taskId, userId) {
  if (!userId) {
    throw new HttpError(400, "User id is required");
  }

  if (!taskId) {
    throw new HttpError(400, "Task id is required");
  }

  const id = Number(taskId);

  if (!Number.isInteger(id) || id <=0){
    throw new HttpError(400, "Invalid task id");
  }

  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId],
  );

  if(rows.length === 0){
    throw new HttpError(404, "Task not found");
  }

  return { task: rows[0] };
}

async function deleteTaskById(tasksId, userId) {
  console.log('LLEGA AQUÍ EN EL BACKEND: ', tasksId)
  if (!userId) {
    throw new HttpError(400, "User_id is required");
  }

  const ids = Array.isArray(tasksId) ? tasksId : [tasksId];

  const cleanIds = ids
    .map((x) => Number(x))
    .filter((x) => Number.isInteger(x) && x > 0);

  if (cleanIds.length === 0) {
    throw new HttpError(400, "Task id is required");
  }

  let deletedCount = 0;
  for (const id of cleanIds) {
    const [result] = await db.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    deletedCount = result.affectedRows || 0;
  }

  return { deletedCount };
}

module.exports = { getTasksByUser, getTaskByTaskId, deleteTaskById };
