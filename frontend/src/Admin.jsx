import React from 'react'
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminHome from "./Pages/admin/adminhome"
import CreateUser from "./Pages/admin/createUser";
import { Routes, Route } from "react-router-dom";
import Edituser from './Pages/admin/edituser';
import Adminlog from './Middleware/adminlog'
import Adminmid from './Middleware/adminmid'
const Admin = () => {
  return (
    
    <Routes>

        <Route element={<Adminmid/>}>
        <Route path="/admin" element={<AdminLogin />}/>
        </Route>
   
        <Route element={<Adminlog/>}>
            <Route path="/admin/home" element={<AdminHome />} />
        </Route>

      
        <Route path="/admin/createuser" element={<CreateUser />} />
        <Route path='/admin/edituser/:id' element={<Edituser/>}/>
    </Routes>
     
  )
}

export default Admin
