import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../protectedRoute";
import { PublicRoute } from "../PublicRoute";
import { LoginPage } from "./features/auth/LoginPage";
import { TasksPage } from "./features/tasks/TasksPage";
import { AppLayout } from "./layout/AppLayout";
import { SignUpPage } from "./features/auth/SignUpPage";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/tasks",
        element: <TasksPage />,
      },
    ],
  },
]);
