import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/auth/LoginPage";
import { TasksPage } from "./features/tasks/TasksPage";
import { AppLayout } from "./layout/AppLayout";
import { LogUpPage } from "./features/auth/LogUpPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [{ path: "/tasks", element: <TasksPage /> }],
  },
  {
    element: <AppLayout />,
    children: [{ path: "/log-up", element: <LogUpPage />}],
  }
]);
