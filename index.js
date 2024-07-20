const express = require('express');
const dotenv=require('dotenv');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./connectDB');
const cors = require('cors')
const bodyParser = require('body-parser');
const cloudinary=require('cloudinary').v2;
const authRouter = require('./Routes/Authentication/Authentication');
const categoryRouter = require('./Routes/Category/Category');
const ProfileRoute = require('./Routes/Profile/profile');
const ItemRoute = require('./Routes/Item/item');
const visitRouter = require('./Routes/Profile/visitProfile');



dotenv.config();

connectDB();

app.use(cors({
  origin: '*', // Your frontend URL
  optionsSuccessStatus: 200
}));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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

const PORT=4000;

app.listen(PORT , (req,res) =>{
    console.log(`server is running at ${PORT}`);
})