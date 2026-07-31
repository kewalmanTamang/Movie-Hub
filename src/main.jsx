import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"; 

import ThemeProvider from './context/ThemeContext';

import Home from "./pages/Home"; 
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: "/", 
    element:<Home/>
  },{
    path:"/movie/:id", 
    element:<MovieDetails/>,
  },
  {
    path:"/favorites",
    element:<Favorites/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>
);