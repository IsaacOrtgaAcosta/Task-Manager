import { http } from "./http";

export async function getTasksList() {
  return http("/tasks/", {
    method: "GET",
    contentType: "application/json",
    auth: true,
  });
}

export async function getTaskById(taskId) {
  return http(`/tasks/${taskId}`, {
    method: "GET",
    contentType: "application/json",
    auth: true,
  });
}

export async function deleteTask(taskId) {
  return http(`/tasks/${taskId}`, {
    method: "DELETE",
    contentType: "application/json",
    auth: true,
  });
}

export async function updateTask(taskId, updates) {
  console.log('updates: ', updates);
  return http(`/tasks/${taskId}`, {
    method: "PATCH",
    contentType: "application/json",
    auth: true,
    body: updates,
  });
}
