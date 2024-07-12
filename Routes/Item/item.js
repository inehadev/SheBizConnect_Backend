const express = require('express');
const Item = require('../../models/ItemModel');
const profile=require('../../models/ProfileModel');
const protect = require('../../middleware/protect');

const ItemRoute = express.Router();

ItemRoute.post('/createItem/:profileId' , protect , async(req,res)=>{
  try {
      const {img  , price , name}=req.body;
    const existitem = await Item.findOne({name , img });
    if(existitem){
        res.status(400).json("This item already exist");
        
    }
   const  { created_by}=req.user;
   const  { profileId}=req.params;
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
    console.log(error);
    res.json(error);
    
  }
} )

module.exports=ItemRoute;