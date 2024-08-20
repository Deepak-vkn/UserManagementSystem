import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../components/header';
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const adminhome = () => {
    const [users, setUsers] = useState([]);
    const Navigate=useNavigate()
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        async function fetchUsers() {
          try {
            const response = await axios.get('/api/admin/fetchusers');
            if (response.data && response.data.success) {
              setUsers(response.data.users);
              console.log(users)
            } else {
              console.error('Failed to fetch users:', response.data.message);
            }
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
        }
    
        fetchUsers();
      }, []);


      const navigateuser=()=>{
        Navigate('/admin/createuser')
      }

      const handleEdit=(id)=>{
        Navigate(`/admin/edituser/${id}`)
     
      }
      const user = useSelector((state)=>state.admin.adminInfo)
      console.log('admin detailes  printed on admin home page ',user)


      const handleDelete=async(id)=>{
        try {
           const response=await axios.post('/api/admin/deleteuser',{id})

           if(response.data && response.data.success){
            Swal.fire({
              icon: 'success',
              title: 'User Deleted',
              showConfirmButton: false, 
              timer: 1000,
              text: response.data.message
          }).then(() => {
      
            window.location.reload();
          });
           }
           else{
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              showConfirmButton: false, 
              timer: 2000,
              text: response.data.message || 'Failed to delete user'
          });

           }
          
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            showConfirmButton: false, 
            timer: 2000,
            text: response.data.message || 'Failed to delete user'
        });
          console.log(error.message)
        }
      }
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
  return (
    <>
    <Header user={user} admin={true}/>
    <div className="admin-actions">
        <button className="create-user-button" onClick={navigateuser}>
          Create User
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

    <div className="table-container">
  <div>
    <table>
      <thead>
        <tr>
          <th>Profile Picture</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user._id}>
            <td>
              {user.image ? (
                <img src={`/public/uploads/${user.image}`} alt="Profile" width="50" height="50" />
              ) : (
                <img src={`/public/uploads/0d64989794b1a4c9d89bff571d3d5842.jpg`} alt="Profile" width="50" height="50" />
              )}
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            <div class="actions">
              <button class='editbutton' onClick={() => handleEdit(user._id)}>Edit</button>
              <button class='deletebutton' onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    </>
  )
}

export default adminhome
