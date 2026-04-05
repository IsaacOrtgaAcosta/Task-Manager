import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./app/providers/AuthProvider";

export const PublicRoute = () => {
    const { isAuthenticated} = useAuth();

    return !isAuthenticated ? <Outlet /> : <Navigate to="/tasks" replace />
}