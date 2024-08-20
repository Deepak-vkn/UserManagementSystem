import React from 'react';
import axios from 'axios';
import { useNavigate,NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../slices/userslice';
import { adminlogout } from '../slices/adminslice';

const Header = ({user,admin=false}) => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const adminis =useSelector((state)=>state.admin.adminInfo)

  const handleLogout = async () => {

    if (admin) {
      try {
     dispatch(adminlogout());  
     console.log('admin detailes  printed after admin logout ',adminis)
     navigate('/admin')
      } catch (error) {
        console.log(error.message);
      }
    }
    else{
      try {
      
        const response = await axios.get('/api/userlogout');
        if(response.data.success){
          dispatch(logout())
          navigate('/')
        }
      } catch (error) {
        console.log('Error during logout:', error.message);
      }
    }
   
  }

  return (
    <div className="navbar">
  <div className="navbar-container">
    <div className="navbar-links">
      <a href="#" className="logo">MyApp</a>
      {admin ? null : <NavLink to='/home' activeClassName="active">Home</NavLink>}
      {admin ? null : <NavLink to='/profile' activeClassName="active">Profile</NavLink>}
    </div>
    <div className="user-info">
      {admin?null:<img src={`/public/uploads/${user.image}`} alt="Profile Picture" className="profile-pic" />}
      
      <span className="username">{user?.name || 'Guest'}</span>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  </div>
</div>


  );
}

export default Header;
