import React from 'react'
import Header from '../../components/header';
import { useSelector } from 'react-redux';

const Home = () => {

  const user=useSelector((state)=>state.auth.userInfo)
 
  return (
    <div>

      <Header user={user}/>

      
    </div>
  )
}

export default Home
