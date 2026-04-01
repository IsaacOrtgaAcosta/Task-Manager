import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "./app/providers/AuthProvider.jsx";
import "./App.css";
import { NewTaskProvider } from "./app/providers/NewTaskProvider.jsx";

export const App = () => {
  return (
    <AuthProvider>
      <NewTaskProvider>
        <RouterProvider router={router} />
      </NewTaskProvider>
    </AuthProvider>
  );
};
