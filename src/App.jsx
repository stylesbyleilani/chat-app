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
{/* <Navbar/>
<Outlet/>
<Pooter/> */}
</div>
  )
};

const router = createBrowserRouter([
  // { 
  //    path:"/",
  //    element:<Layout/>,
  //    children:[
  //     {
  //       path:"/",
  //       element:<HomePage/>
  //     }
  //    ]

  // },

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
    // <div className='app  w-[90vw] h-[90vh] rounded-lg bg-black p-2 m-2'>
      <div className='app w-[100vw]'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
