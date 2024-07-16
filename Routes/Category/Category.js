const express = require('express');
const protect = require('../../middleware/protect.js')
const category = require('../../models/CategoryModel.js');
// const Category = require('../../models/CategoryModel.js');
const cloudinary = require('cloudinary').v2;
const categoryRouter = express.Router();


/// api to create category 

categoryRouter.post('/category' , protect ,  async (req,res )=>{
  console.log(req.body)
  try {
    const { CategoryType ,image , profiles}=req.body;
    posted_by = req.user;
    console.log(posted_by);
    console.log(image);
     const existentCategory = await category.findOne({ CategoryType, image });
    
    if(existentCategory){
    console.log("this category is already present");
    return res.status(400).json({message:" this  type of category already present"});
    }
 

  let imageUrl = image;
    if(image){
         const upload = await  cloudinary.uploader.upload(image);
         imageUrl = upload.secure_url;

    }
    const newcategory = new category ({
      
      posted_by,
      CategoryType:CategoryType,
        image:imageUrl,
        profiles
    })
    
         const response=  await newcategory.save();
         return res.status(200).json(response);

    
  } catch (error) {
    console.log({message:"error in category"} , error);
    return res.status(400).json({message:"Error in category"})
    
  }
})


/// api to get all categories

categoryRouter.get('/getCategory' , async (req,res)=>{
    const allCategory = await category.find({});
    
    res.status(200).json( allCategory);
})

// api to update catgeory 

categoryRouter.put('/updateCategory/:categoryId' , protect , async(req,res)=>{
  
  try {
    const  {categoryId} = req.params;
    
    console.log(categoryId);
  const Categoryy = await category.findById(categoryId);
 
  if(!Categoryy){
    console.log("category not found");
  }

  Categoryy.CategoryType =req.body.CategoryType ||  Categoryy.CategoryType
    if(req.body.image){
      Categoryy.image = req.body.image;
    }
await Categoryy.save();
res.status(200).json({ message: "Category updated successfully", category });
 
    
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the category" });
    
    
  }
})


// api to get profiles from category

categoryRouter.get('/getsubcategory/:categoryId' , async(req,res)=>{
  const { categoryId } = req.params;
  console.log(`Fetching profiles with ID: ${categoryId}`);
  
try{

  const Category = await category.findById(categoryId).populate('profiles');
  res.json(Category);
  console.log(`Category found: ${Category}`);

console.log('Categories with profiles:', Category);
return Category;
} catch (error) {
console.error('Error getting categories with profiles:', error);
}

})
module.exports=categoryRouter;

