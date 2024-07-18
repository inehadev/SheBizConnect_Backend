const express = require('express');
const dotenv=require('dotenv');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./connectDB');
const bodyParser = require('body-parser');
const cloudinary=require('cloudinary').v2;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const cors = require('cors')
const authRouter = require('./Routes/Authentication/Authentication');
const categoryRouter = require('./Routes/Category/Category');
const ProfileRoute = require('./Routes/Profile/profile');
const ItemRoute = require('./Routes/Item/item');
const visitRouter = require('./Routes/Profile/visitProfile');


const PORT=4000;
dotenv.config();

connectDB();
// app.use(cors({
//     origin: 'https://shebizconnect.vercel.app', // Your frontend URL
//     optionsSuccessStatus: 200
//   }));
app.use(cors());
app.use(express.json());

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
 
 })
 


app.use(  authRouter);
app.use( categoryRouter)
app.use(ProfileRoute)
app.use(ItemRoute);
app.use(visitRouter);


app.listen(PORT , (req,res) =>{
    console.log(`server is running at ${PORT}`);
})