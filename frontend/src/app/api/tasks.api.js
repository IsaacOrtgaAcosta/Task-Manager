import { http } from "./http";

export async function getTasksList({ page, limit }) {
  return http(`/tasks?page=${page}&limit=${limit}`, {
    method: "GET",
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
  return http(`/tasks/${taskId}`, {
    method: "PATCH",
    contentType: "application/json",
    auth: true,
    body: updates,
  });
}

export async function saveNewTask(newTask) {
  console.log(newTask);
  return http("/tasks/", {
    method: "POST",
    contentType: "application/json",
    auth: true,
    body: newTask,
  });
}
