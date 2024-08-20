import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../slices/userslice';

const UserMiddleware = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(state => state.auth.login);
  const id = useSelector(state => state.auth.userInfo?._id);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    async function validateToken() {
      try {
        if (login) {
          const response = await axios.post('/api/validate-token', { id });

          if (!response.data.token) {
            dispatch(logout());
            setIsTokenValid(false);
            navigate('/');
          }
        }
      } catch (error) {
        console.error(error);
        setIsTokenValid(false);
        navigate('/');
      }
    }
    validateToken();
  }, [dispatch, login, id, navigate]);

  if (!login || !isTokenValid) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default UserMiddleware;
