const express = require('express');
const Item = require('../../models/ItemModel');
const profile=require('../../models/ProfileModel');
const protect = require('../../middleware/protect');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const ItemRoute = express.Router();

ItemRoute.post('/createItem/:profileId' , protect , async(req,res)=>{
  try {
    console.log("working fine")
      const { price , name}=req.body;
      let {img} = req.body
      const  { created_by}=req.user;
   const  { profileId}=req.params;
    const existitem = await Item.findOne({name , img });
    

    if(existitem){
        res.status(400).json("This item already exist");
        
    }
    if(img){
      const response = await cloudinary.uploader.upload(img);
      img= response.secure_url;
      console.log(img);

    }
   
   const Profile = await profile.findById(profileId);

    const newItem = new Item({
        created_by,
        profileId,
        img:img ,
        price:price,
        name:name
        
    })
    

     await newItem.save();
     console.log("item is added successfully");
    
   
     if (Profile) {
       Profile.AddItem.push(newItem);
       await Profile.save();
       res.json(Profile);
     } else {
       return res.status(404).json("Profile not found");
     }
 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
    
  }
} )


///api to get profileItem

ItemRoute.get('/profileItem/:profileId'  , async(req,res)=>{
  try {
    const {profileId} =req.params;
    const Profile = await profile.findById(profileId).populate('AddItem');
    if(!Profile){
      res.status(400).json("profile not found");
    }
    return res.status(200).json(Profile.AddItem);
  } catch (error) {
    console.log(error);
    res.json(error);
    
    
  }
})
module.exports=ItemRoute;