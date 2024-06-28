const express = require('express');
const protect = require('../../middleware/protect.js')
const category = require('../../models/CategoryModel.js');
const Category = require('../../models/CategoryModel.js');
const cloudinary = require('cloudinary').v2;
const categoryRouter = express.Router();

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
    console.log(allCategory);
    res.status(200).json( allCategory);
})


// api to get subcategory 

categoryRouter.get('/getsubcategory/:categoryId' , async(req,res)=>{
  const { categoryId } = req.params;
  console.log(`Fetching category with ID: ${categoryId}`);
  
try{

  const category = await Category.findById(categoryId).populate('profiles');
  res.json(category);
  console.log(`Category found: ${category}`);

console.log('Categories with profiles:', category);
return category;
} catch (error) {
console.error('Error getting categories with profiles:', error);
}

})
module.exports=categoryRouter;

