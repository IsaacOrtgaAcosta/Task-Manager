export async function searchTasksList() {
  return http("/tasks/", {
    method: "GET",
    contentType: "application/json",
    auth: true,
  });
}
