import User from '../models/userModels.js'
import generateToken from '../utils/generatejwt.js';
import jwt from 'jsonwebtoken';




const login=async(req,res)=>{
  console.log('dggshdghjas')
 
}


//------------------------------------------------------------------------------




 const register = async (req, res) => {
  try {
    console.log('Reached backend');
    const { username, email, password } = req.body;
    console.log(username, email, password)

    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User with this email already exists' });
    }

    const newUser = new User({
      name: username,
      email: email,
      password: password,
    });

    const savedUser = await newUser.save();

    if(savedUser){

      generateToken(res,savedUser._id)


      res.json({ success: true, message: 'User registered successfully' });

    }

    
  } catch (error) {
    console.error('Error registering user:', error.message || error);
    res.json({ success: false, message: 'Server Error' });
  }
};



//-----------------------------------------------------------------------------------------
const loginpost = async (req, res) => {
  try {
      console.log('reached backend');
      const { usermail, password } = req.body;
      console.log(usermail, password);
      const user = await User.findOne({ email: usermail });

      if (user) {
          if (user.password === password) {
   
              
            generateToken(res,user._id)


              return res.json({ success: true, message: 'Login success', user: user });
          } else {

              return res.json({ success: false, message: 'Incorrect password' });
          }
      } else {
       
          return res.json({ success: false, message: 'User does not exist' });
      }

  } catch (error) {
   
      console.log(error.message);
      return res.json({ success: false, message: 'Internal server error' });
  }
};

const userlogout = async (req, res) => {
  try {
    console.log('Cookie before logout is:', req.cookies.jwt);
    
 
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0), 
      sameSite: 'strict',  
    });

    res.json({ success: true, message: "User logged out" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "An error occurred during logout" });
  }
};

const checkcookie=async(req,res)=>{
  try {
    console.log("currnt cookie status is",req.cookies.jwt)
    
  } catch (error) {
    console.log(error.message)
  }
}
const upload = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const fileUrl = req.file.filename;
    user.image = fileUrl;
    await user.save();

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error });
  }
};


const validate_token = async (req, res) => {
 let token = req.cookies.jwt;

 console.log(token);
 console.log("reacehd token chekn")

 if (token) {
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     const user = await User.findById(decoded.userId).select('password');
     
     if (user) {
      console.log("tokn found")
       res.json({ success: true, token: true })
     } else {
      console.log("tokn not found")
       res.json({ success: false, token: false }); 
     }
   } catch (error) {
    console.log("tokn not found")
     console.error(error);
     res.json({ success: false, token: false });
   }
 } else {
  console.log("tokn not found")

   res.json({ success: false, token: false });
 }
};


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


export { 
  register,
  login,
  loginpost,
  userlogout,
  checkcookie,
  upload,
  validate_token,
  edituser

 }; 