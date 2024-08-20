import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setCredentials,logout } from '../../slices/userslice';
import Header from '../../components/header'
const Userprofile = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageurl,setImageUrl]=useState(null)
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [navigateHome, setNavigateHome] = useState(false);


  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (navigateHome) {
      navigate('/');
    }
  }, [navigateHome, navigate]);

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userInfo._id);

    setUploading(true);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const newImageUrl = response.data.url;
      const updatedUser = { ...user, image: newImageUrl };
      setUser(updatedUser);
      dispatch(setCredentials(updatedUser));
      setUploading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        setNavigateHome(true);
      } else {
        console.error('Error uploading image', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header user={user}/>
    <div className="user-card">
      <img src={`/public/uploads/${user.image}`} alt="User" className="user-image" />
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button className="edit-button" onClick={() => handleEdit(user._id)}>Edit</button>
      </div>
      <form onSubmit={handleImageUpload} className="image-upload-form">
        <input type="file" onChange={handleImageChange} />
        <button className='uploadbtn'type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Image'}</button>
      </form>
    </div>
    </>
  );
};

export default Userprofile;
