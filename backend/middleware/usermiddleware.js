import jwt from 'jsonwebtoken';
import User from '../models/userModels.js'

const protect=async(req,res,next)=>{

    let token
    token=req.cookies.jwt

    console.log(token)

    if(token){
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        const user=await User.findById(decoded.userId).select('password')
  if(user){
    console.log("TOKEMN FOUND AT MIDLEWRE")
    next()

  }

    }
    else{
        console.log("not found token in middlwrEW")
        res.json({success:false,token:false})
    }
}

export default protect