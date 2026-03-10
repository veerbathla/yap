import express from 'express';
import { sendMessage,getMessage } from '../controller/messageController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
const router=express.Router();

router.post('send/:id',isLoggedIn,sendMessage)

router.post('/:id',isLoggedIn,getMessage)


export default router;