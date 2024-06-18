const express = require('express');
const protect = require('../../middleware/protect.js')
const category = require('../../models/CategoryModel.js')
const cloudinary = require('cloudinary').v2;
const categoryRouter = express.Router();

categoryRouter.post('/category' , protect ,  async (req,res )=>{
  console.log(req.body)
  try {
    const {CategoryType ,image}=req.body;
    console.log("workinging")
    console.log(image);
     const existentCategory = await category.findOne({ CategoryType, image });
    
    if(existentCategory){
    console.log("this category is already present");
    return res.status(400).json({message:" this  type of category already present"});
    }
  console.log("good");
    if(image){
         const upload = await  cloudinary.uploader.upload(image);
         image = upload.secure_url;

    }
    const newcategory = new category ({
        CategoryType:CategoryType,
        image:image
    })
      console.log("fine");
           await newcategory.save();
         return res.status(200).json(newcategory._doc);

    
  } catch (error) {
    console.log({message:"error in category"} , error);
    return res.status(400).json({message:"Error in category"})
    
  }
})


/// api to get all categories

categoryRouter.get('/getCategory' , async (req,res)=>{
    const allCategory = await category.find({});
    console.log(allCategory);
    res.status(200).json( allCategory);
})

module.exports=categoryRouter;

