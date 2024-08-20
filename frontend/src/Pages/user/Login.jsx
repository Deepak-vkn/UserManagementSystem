import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../../slices/userslice';



const Login = () => {
  const [usermail, setUsermail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const dispath=useDispatch()
  
  // const user=useSelector((state)=>state.auth.userInfo)
  // const loginstatus=useSelector((state)=>state.auth.login)
  // console.log(user,loginstatus)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            '/api/login', {
                usermail,
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
                  dispath(setCredentials(result.user))
                  navigate('/home')
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
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input
        type="text"
        name="username"
        value={usermail}
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
  <p>
    Don't have an account? <Link to="register">Register here</Link>
  </p>
</div>

  );
};

export default Login;
