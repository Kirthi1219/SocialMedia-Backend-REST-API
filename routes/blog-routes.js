import express from 'express'
import {getAllBlogs,addBlog, updateBlog, getById, deleteBlog, getByUserId} from "../controllers/blog-controller"
const blogRouter=express.Router()

blogRouter.get("/",getAllBlogs)
blogRouter.post("/add",addBlog)
//The path of the route is /update/:id. 
//This indicates that the route is expecting a parameter id in the URL, which can be accessed in the route handler.
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",getByUserId)
export default blogRouter