import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from '../../components/form'; 
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/userslice';
const edituser = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState()
    const id=useParams()
    const dispatch=useDispatch()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/admin/getuser', { id: id });
                const user = response.data.user;
                setUser(user)
                console.log(user)
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchData();
    }, [id]);
    

    const handleSubmit = async (formData) => {
        try {
            const { usermail, password, username } = formData;
    
            const response = await axios.post('/api/edituser', {
                usermail,
                password,
                username,
                id
            });
    
            if (response.data && response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Created',
                    showConfirmButton: false, 
                timer: 1000,
                    text: 'User updated successfully'
                })
                .then(()=>{

                    dispatch(setCredentials(response.data.user))
                    navigate('/profile')
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false, 
                timer: 1000,
                    text: response.data.message || 'Failed to update user'
                });

            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                showConfirmButton: false, 
                timer: 1000,
                text: error.message || 'Error creating user'
            });
        }
    };
  return (
    <Form 
    formtitle={'Update User'}
    handleSubmit={handleSubmit} 
    initialdata={user}
    >
        
    </Form>
  )
}

export default edituser