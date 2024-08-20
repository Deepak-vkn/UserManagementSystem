import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const adminmid = () => {
    const login=useSelector((state)=>state.admin.login)
    const admin=useSelector((state)=>state.admin.adminInfo)
    console.log("admin info from midleware ",admin)

    if(login){
        return   <Navigate to='/admin/home' />
       
    }
    return <Outlet/>
}

export default adminmid