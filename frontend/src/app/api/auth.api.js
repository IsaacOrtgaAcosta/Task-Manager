import { http } from "./http";

export async function login({ email, password }) {
  return http("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function logup({ email, name, lastName, password }) {
  return http("/auth/logup", {
    method: "POST",
    body: { email, name, lastName, password },
  });
}
