import Login from "./Pages/user/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/user/Register";
import Home from './Pages/user/Home'
import Profile from './Pages/user/Userprofile.jsx'
import EditUser from "./Pages/user/editUser.jsx";
import Admin from './Admin.jsx'
import Usermid from "./Middleware/usermid.jsx";
import UserLogged from "./Middleware/userLogged.jsx";
function App() {
  return (
    <>
    <Routes>
   
        <Route element={<UserLogged/>}>

        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        </Route>
       
      <Route element={<Usermid />}>
        <Route path='home' element={<Home />}/>
        <Route path='profile' element={<Profile />}/>
        <Route path='edituser/:id' element={<EditUser />}/>
      </Route>
      {/* <Route path="admin/home" element={<AdminHome />} /> */}
    </Routes>
    <Admin/>
    </>
  );
}
export default App;
 