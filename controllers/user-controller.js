import User from "../models/User"
import bcrypt from "bcryptjs"

//this controller function retrieves all users from the database using Mongoose, handles errors that may occur during the process, 
//and responds with either a list of users or a 404 status and a message indicating that no users were found.
export const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find()
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"No users found"})
    }
    return res.status(200).json({users})
}

//This code handles the user registration process by checking if the user already exists, creating a new user if not, and saving the user to the database.
// It responds with appropriate status codes and messages based on the outcome.
export const signup=async(req,res,next)=>{
    const { name, email, password }=req.body
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"user already exists!Login Instead"})
    }
    const hashedPassword=bcrypt.hashSync(password)
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    })
    try{
        await user.save();
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({user})
}

//This controller function is designed to handle user authentication by 
//checking if the provided credentials match an existing user in the database.
export const login=async(req,res,next)=>{
    const {email, password }=req.body
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"couldn't find user by this email"})
    }
    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login successfull"})
}