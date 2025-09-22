import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'


import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT=process.env.PORT || 4000
const app=express()

app.use(express.json())//all the request will be passed using json method
app.use(cors())
await connectDB()

app.get("/googlee4c0920809f819d6.html", (req, res) => {
  res.sendFile(path.join(__dirname, "googlee4c0920809f819d6.html"));
});

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/',(req,res)=>res.send("API Working"))

//start express app
app.listen(PORT,()=>console.log('Server running on port '+PORT));
