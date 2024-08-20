import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { setAdminCredentials,adminlogout } from '../../slices/adminslice';


const Login = () => {
  const [adminmail, setUsermail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const admin=useSelector((state)=>state.admin.adminInfo)
  console.log("admin is",admin)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            '/api/admin', {
              adminmail,
                password
            }
        );

        const result = response.data;

        if (result) {
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: false, 
                    timer: 1000,
                    text: result.message,
                })
                .then(()=>{
                  console.log(result.admin)
                  dispatch(setAdminCredentials(result.admin))
              
                  navigate('/admin/home')
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false, 
                    timer: 1000,
                    text: result.message,
                });
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};

  return (
<div className="login-box">
  <h2>Admin Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input
        type="email"
        name="username"
        value={adminmail}
        onChange={(e) => setUsermail(e.target.value)}
        required
      />
      <label>Email</label>
    </div>
    <div className="user-box">
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Password</label>
    </div>
    <button type="submit">Login</button>
  </form>

</div>
  );
};


export default Login;
