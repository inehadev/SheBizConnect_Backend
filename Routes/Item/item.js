const express = require('express');
const Item = require('../../models/ItemModel');
const profile=require('../../models/ProfileModel');
const protect = require('../../middleware/protect');

const ItemRoute = express.Router();

ItemRoute.post('/createItem/:profileId' , protect , async(req,res)=>{
  try {
      const {img , profileId , created_by , price , name}=req.body;
    const existitem = await Item.findOne({name , img , profileId});
    if(existitem){
        res.status(400).json("This item already exist");
        
    }
      created_by=req.user;
      profileId=req.params;

    const newItem = new Item({
        created_by,
        profileId,
        img:img ,
        price:price,
        name:name
        
    })

     await newItem.save();
     console.log("item is added successfully");
     const profile = await profile.findById(profileId);
     if (profile) {
       profile.AddItem.push(newItem);
       await profile.save();
     } else {
       return res.status(404).json("Profile not found");
     }
 
    
  } catch (error) {
    console.log(error);
    res.json(error);
    
  }
} )

module.exports=ItemRoute;