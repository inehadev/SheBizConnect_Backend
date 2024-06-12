const express = require('express');
const dotenv=require('dotenv');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./connectDB');
const cors = require('cors')
const authRouter = require('./Routes/Authentication/Authentication');
const categoryRouter = require('./Routes/Category/Category');

const PORT=4000;
dotenv.config();

connectDB();
app.use(express.json());
app.use(cors());

app.use(  authRouter);
app.use( categoryRouter)


app.listen(PORT , (req,res) =>{
    console.log(`server is running at ${PORT}`);
})