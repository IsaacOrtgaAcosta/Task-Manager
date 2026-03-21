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
  console.log('LLEGA A LA API: ', taskId)
  return http(`/tasks/${taskId}`, {
    method: "DELETE",
    contentType: "application/json",
    auth: true,
  });
}
