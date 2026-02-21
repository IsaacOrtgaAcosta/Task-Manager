import { http } from "./http";

export async function login({ email, password }){
    return http("/auth/login", {
        method: "POST",
        body: { email, password },
    });
}