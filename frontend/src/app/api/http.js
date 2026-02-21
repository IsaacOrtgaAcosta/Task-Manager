const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:300/api";

function getToken(){
    return localStorage.getItem("access_token");
}

export async function http(path, { method = "GET", body, auth = false} = {}) {
    const headers = {
        "Content-Type": "application/json",
    };

    if(auth){
        const token = getToken();
        if(token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json().catch(() => null) : null;

    if(!res.ok){
        const message = data?.error?.message || "Request failed";
        const code = data?.error?.code || "REQUEST FAILED";
        const details = data?.error?.details;

        const error = new Error(message);
        error.status = res.status;
        error.code = code;
        error.details = details;
        throw error;
    }

    return data;
} 