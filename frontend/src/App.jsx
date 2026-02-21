import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './App.css'

export const App = () => {

  return <RouterProvider router={router} />;
}

