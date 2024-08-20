import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const userLogged = () => {
    
    const login=useSelector((state)=>state.auth.login)

    if(login){
      return   <Navigate to='/home'/>
    }
    return <Outlet/>
}

export default userLogged




