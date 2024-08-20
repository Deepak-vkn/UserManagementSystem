import Admin from '../models/adminModels.js'
import User from '../models/userModels.js'

const login=async(req,res)=>{

    try {
        console.log('reached admin controll')
        
    } catch (error) {
        console.log(error.messaage)
    }
}

const loginpost = async (req, res) => {
    try {

      const { adminmail, password } = req.body;
      console.log(adminmail, password);
      const admin = await Admin.findOne({ email: adminmail });
      console.log(admin)
  
      if (admin) {
        if (admin.password === password) {
     
          return res.json({ success: true, message: 'Login successful', admin: admin });
        } else {
     
          return res.json({ success: false, message: 'Admin does not exist' });
        }
      } else {
     
        return res.json({ success: false, message: 'Admin does not exist' });
      }
  
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, message: 'Internal server error' });
    }
  };
  

  const fetchusers = async (req, res) => {
    try {
     
      const users = await User.find();
      
      return res.json({ success: true, users: users });
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, message: 'Internal server error' });
    }
  };


  const createuser = async (req, res) => {
    try {
        const { usermail, password, username } = req.body;


        const checkuser = await User.findOne({ email: usermail });
        
        if (checkuser) {
         
            console.log("User already exists");
            return res.json({ success: false, message: "User already exists" });
        } else {
         
            const newuser = new User({
                name: username,
                email: usermail,
                password: password
            });

    
            const savedUser = await newuser.save();

            if (savedUser) {
            
                console.log("User created successfully");
                return res.json({ success: true, message: "User created successfully" });
            } else {
          
                console.log("Failed to save user");
                return res.json({ success: false, message: "Failed to save user" });
            }
        }
    } catch (error) {
       
        console.log(error.message);
        return res.json({ success: false, message: "Internal server error" });
    }
};


const getuser = async (req, res) => {
    try {
        const id = req.body.id
       
        const user = await User.findOne({ _id: id.id});

        if (user) {
 
            res.json({ success: true, user ,tokken:true});
        } else {

            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
 
        console.error('Error fetching user data:', error.message);
        res.json({ success: false, message: 'Internal server error' });
    }
}

const edituser = async (req, res) => {
  try {
    const { usermail, password, username, id } = req.body;

    const user = await User.findOne({ _id: id.id });

   
    const existingUser = await User.findOne({ email: usermail });

    if (existingUser && existingUser._id.toString() !== id.id) {
    
      return res.json({ success: false, message: 'A user with this email already exists. Please confirm if you want to update this user.' });
    }


    user.email = usermail;
    user.password = password;
    user.name = username;

    await user.save();

    return res.json({ success: true, message: 'User updated successfully' ,user:user});
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteuser = async (req, res) => {
  try {
    const { id } = req.body;
    console.log('reached here')


    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: 'Internal Server Error' });
  }
};
  

export {
    login,
    loginpost,
    fetchusers,
    createuser,
    getuser,
    edituser,
    deleteuser,
}