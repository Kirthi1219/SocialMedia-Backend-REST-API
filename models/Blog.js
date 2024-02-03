import mongoose from "mongoose";

const Schema=mongoose.Schema;

const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    //The relationship being established is a one-to-one relationship(a blog can be associated with only one user)
    user:{
        type:mongoose.Types.ObjectId,
        Ref:"User",
        required:true
    }
})

export default mongoose.model("Blog",blogSchema)