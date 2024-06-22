const express=require('express');
const ProfileRoute=express.Router();
const Profile=require('../../models/ProfileModel');
const protect = require('../../middleware/protect');
const cloudinary=require('cloudinary').v2

ProfileRoute.post('/create' , protect , async(req,res)=>{
  try {
    const {title , type,location}=req.body;
    let {img}=req.body;
    const created_by=req.user;
 
    
    const existentProfile= await  Profile.findOne({title, img });
    if(existentProfile){
        return res.status(400).json({message: "profile already existed"});
    }
    if(img){
        const response = await  cloudinary.uploader.upload(img);
       img = response.secure_url;
        console.log( response.secure_url);
    }

    const profile= new Profile({
     created_by,
     title:title,
    img:img,
    type:type,
    location:location

    })

    await profile.save();
    return res.status(200).json({message:"profile is created " , profile} );
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:error})
    
  }
    



})

module.exports=ProfileRoute;