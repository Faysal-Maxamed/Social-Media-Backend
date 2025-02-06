import express from 'express';
import { UpdateUser, createUser, getUserById, getUsers, login } from '../controller/userController.js';


const router = express.Router();

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUserById).put(UpdateUser)
router.route('/login').post(login)

export default router
