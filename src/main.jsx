import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import SignUpPage from './components/SignUpPage/SignUpPage.jsx'
import RecipeView from './components/RecipePage/RecipeView.jsx'
import UserProfile from './components/user/userProfile.jsx'
import AddRecipe from './components/RecipePage/AddRecipe.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import '../src/index.css'
import Home from './components/HomePage/Home.jsx'
import ViewRecipe from './components/RecipePage/ViewRecipe.jsx'
import MealPlan from './components/MealPlan.jsx'
import VerifyOtpPage from './components/SignUpPage/VerifyOtpPage.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    path: "/verifyOtp",
    element: <VerifyOtpPage/>
  },
  {
    path: "/recipes",
    element: <ViewRecipe/>
  },
  {
    path: "/viewRecipe/:id",
    element: <RecipeView/> 
    },
  {
    path: "/user/profile",
    element: <UserProfile/>
  },
  {
    path:"/createRecipe",
    element:<AddRecipe/>
  },
  {
    path:"/meal-plan",
    element:<MealPlan/>
  }
]);

createRoot(document.getElementById('root')).render(
 
   <RouterProvider router={router} />
  
)
