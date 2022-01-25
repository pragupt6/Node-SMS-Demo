import express from 'express';
import { signUP, verifyOTP, whoAmI, signOut } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/signup')
    .post(signUP);

router.route('/verify')
    .post(verifyOTP);

// router.route('/me').post(whoAmI)
router.route('/me').post(protect, whoAmI)
router.route('/signout').get(protect, signOut)

export default router;