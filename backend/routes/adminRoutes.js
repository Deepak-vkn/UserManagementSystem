
import express from 'express'
const router=express.Router()
import{login,loginpost,fetchusers,createuser,getuser,edituser,deleteuser} from  '../controllers/adminControllers.js'


router.get('/',login)
router.post('/',loginpost)
router.get('/fetchusers',fetchusers)
router.post('/createuser',createuser)
router.post('/getuser',getuser)
router.post('/edituser',edituser)
router.post('/deleteuser',deleteuser)

export default router