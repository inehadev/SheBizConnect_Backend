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




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
 
 })

 app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    console.log('CORS headers set:', res.getHeaders()['access-control-allow-origin']);
    next();
});



app.use( authRouter);
app.use( categoryRouter)
app.use(ProfileRoute)
app.use(ItemRoute);
app.use(visitRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const PORT=4000;

app.listen(PORT , (req,res) =>{
    console.log(`server is running at ${PORT}`);
})
