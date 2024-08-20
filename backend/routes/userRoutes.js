import express from 'express';
import { register, login, loginpost ,userlogout,checkcookie,upload,validate_token,edituser} from '../controllers/userControllers.js';
import multer from 'multer';
import usermid from '../middleware/usermiddleware.js'
const router = express.Router();
import path from 'path';
import { fileURLToPath } from 'url';



// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '../frontend/public/uploads'));
        console.log(path.resolve(__dirname, '..', '../frontend/public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
const uploadMiddleware = multer({ storage });
router.get('/', login);
router.post('/register', register);
router.post('/login', loginpost);
router.get('/userlogout',userlogout)
router.get('/checkcookie',checkcookie)
router.post('/upload',usermid,uploadMiddleware.single('image'),upload)
router.post('/validate-token',validate_token)
router.post('/edituser',usermid,edituser)
export default router;
