import mongoose from "mongoose";
import Blog from "../models/Blog"
import User from "../models/User";

//It retrieves all blogs from the database and sends an appropriate response based on the results of the query.
export const getAllBlogs=async(req,res,next)=>{
    let blogs;
    try{
       // Attempt to retrieve all blogs from the database using the Blog model
       blogs=await Blog.find()
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs found"})
    }
    return res.status(200).json({blogs})
}

//a controller function for handling the addition of a new blog in an Express.js application.
export const addBlog=async(req,res,next)=>{
    const {title,description,image,user}=req.body

    let existingUser;
    try{
        existingUser=await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find user by this ID"})
    }
    const blog=new Blog({
        title,
        description,
        image,
        user
    })
    try{
        //This starts a Mongoose session and begins a transaction within that session. The session and transaction will be used to group multiple operations into an atomic unit, 
        //ensuring that either all operations within the transaction succeed or none of them do. 
        const session=await mongoose.startSession()
        session.startTransaction()
        //This saves the newly created blog to the MongoDB database. 
        //The { session } option indicates that this operation is part of the ongoing transaction in the specified session.
        await blog.save({session})
        //existingUser is a Mongoose model instance representing a user, 
        //this line adds the newly created blog to the blogs array within the existingUser model.
        existingUser.blogs.push(blog)
        //This saves the updated existingUser model (with the added blog) back to the database within the same session. 
        //The { session } option indicates that this operation is also part of the ongoing transaction.
        await existingUser.save({session})
        //This commits the transaction. If all previous operations within the transaction were successful,
        // this line commits the changes to the database. If any operation within the transaction failed, this line would not be reached, and the transaction would be rolled back.
        await session.commitTransaction()
    }catch(err){
        return console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}

//To update a specific blog in the database based on the provided blog ID and updated details.
export const updateBlog=async(req,res,next)=>{
    const {title,description}=req.body
    const blogId=req.params.id
    let blog;
    try{
            //Attempt to find the blog by its ID and update its title and description
            blog=await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog})
}

export const getById=async(req,res,next)=>{
    const id=req.params.id
    let blog;
    try{
        blog= await Blog.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"No blog found"})
    }
    return res.status(200).json({blog})
}

export const deleteBlog=async(req,res,next)=>{
    const id=req.params.id
    let blog
    try{
        blog=await Blog.findByIdAndDelete(id).populate('user')
        if (blog) {
            // Remove the blog reference from the user's blogs array
            await blog.user.blogs.pull(blog)
            await blog.user.save()
          } else {
            // Handle the case where the blog was not found
            return res.status(404).json({ message: 'Blog not found' })
          }
        
        }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"Successfully deleted"})
}

export const getByUserId=async(req,res,next)=>{
    const userId=req.params.id
    let userBlogs
    try{
        userBlogs=await User.findById(userId).populate("blogs")
    }catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blocks found"})
    }
    return res.status(200).json({blogs:userBlogs})
}