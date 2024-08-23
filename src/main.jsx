import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import SignUpPage from './components/SignUpPage/SignUpPage.jsx'
import RecipeView from './components/RecipePage/RecipeView.jsx'
import UserProfile from './components/user/userProfile.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import '../src/index.css'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  },
  {
    path: "/recipes",
    element: <RecipeView/>
  },
  {
    path: "/user/profile",
    element: <UserProfile/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
