import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import Register from './Pages/Register';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
const Layout = ()=>{
  return(
<div className="app  p-0 m-0">

</div>
  )
};

const router = createBrowserRouter([

  {
    path:"/",
    element:<HomePage/>
  },

  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }

])
const App = () => {


  return (
      <div className='app w-[100vw]'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
