import { http } from "./http";

export async function getTasksList() {
  return http("/tasks/", {
    method: "GET",
    contentType: "application/json",
    auth: true,
  });
}


export async function deleteTask (taskId){
  return http(`/task/${taskId}`, {
    method: "DELETE",
    contentType: "application/json",
    auth: true,
  })
}