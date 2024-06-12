const express = require('express');
const protect = require('../../middleware/protect.js')
const category = require('../../models/CategoryModel.js')
const cloudinary = require('cloudinary').v2;
const categoryRouter = express.Router();

categoryRouter.post('/category' , protect ,  async (req,res )=>{
  try {
    const {CategoryType }=req.body;
    let {image}= req.body;
    
     const existentCategory = await category.findOne({ CategoryType, image });
    
    if(existentCategory){
    console.log("this category is already present");
    return res.status(400).json({message:" this  type of category already present"});
    }
  
    if(image){
         const upload = await  cloudinary.uploader.upload(image);
         image = upload.secure_url;

    }
    const newcategory = new category ({
        CategoryType:CategoryType,
        image:image
    })
      
           await newcategory.save();
         return res.status(200).json(newcategory._doc);

    
  } catch (error) {
    console.log({message:"error in category"});
    return res.status(400).json({message:"Error in category"})
    
  }
})

module.exports=categoryRouter;

