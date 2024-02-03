import express from 'express'
import { getAllUser, signup, login} from '../controllers/user-controller'

const router=express.Router()

//When a GET request is made to the root path, the getAllUser function from the user-controller.js file will be invoked.
router.get("/",getAllUser)
router.post("/signup",signup)
router.post("/login",login)
export default router