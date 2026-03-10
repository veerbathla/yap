import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import { getUserBySearch, getCurrentChatters} from "../controller/userhandlerController.js";
const router=express.Router();

router.get('/search',isLoggedIn,getUserBySearch);
router.get('/currentchatters',isLoggedIn,getCurrentChatters);
export default router;