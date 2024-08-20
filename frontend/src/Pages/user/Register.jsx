import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      if (image) {
        formData.append('image', image);
      }
      console.log(username, email, password )

      const response = await axios.post('/api/register', { username, email, password });
      if (response.data && response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false, 
                timer: 1000,
          text: response.data.message,
        });
        setUsername('');
      setPassword('');
      setEmail('');
      navigate('/')

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: false, 
                timer: 1000,
          text:response.data.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: false, 
                timer: 1000,
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            id="usermail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="usermail">Email</label>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {/* <div className="form-group">
          <label htmlFor="image">Profile Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
