import express from 'express'
import mongoose from 'mongoose'
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';

const app=express()

app.use(express.json())//Configures middleware to parse JSON in the request body. 
app.use("/api/user",router) 
app.use("/api/blog",blogRouter)

//code establishes a connection to a MongoDB database using mongoose, starts an Express.js server on port 5000, and logs a success message if everything is successful. If any errors occur during the process, they are caught and logged.
mongoose.connect('mongodb+srv://admin:d4ts7Yc6biYqjySh@cluster0.xo7k8jt.mongodb.net/Blog?retryWrites=true&w=majority')
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to database and listening to localhost 5000"))
  .catch((err) => console.log(err));



