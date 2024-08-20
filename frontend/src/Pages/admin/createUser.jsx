import React, { useState } from 'react';
import Form from '../../components/form'; 
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [usermail, setUsermail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate=useNavigate()

    const handleSubmit = async (formData) => {
        try {
            const { usermail, password, username } = formData;
    
            const response = await axios.post('/api/admin/createuser', {
                usermail,
                password,
                username
            });
    
            if (response.data && response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Created',
                    showConfirmButton: false, 
                timer: 1000,
                    text: 'User created successfully'
                });
                navigate('/admin/home')

                
           
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false, 
                    timer: 1000,
                    text: response.data.message || 'Failed to create user'
                });
               
                  setUsermail('');
                  setPassword('');
                  setUsername('');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                showConfirmButton: false, 
                timer: 1000,
                text: error.message || 'Error creating user'
            });
             
              setUsermail('');
              setPassword('');
              setUsername('');
        }
    };

    return (
        <div>
            <Form
                formTitle="Create User"
                handleSubmit={handleSubmit}
                admin={true}
            />
        </div>
    );
};

export default CreateUser;
