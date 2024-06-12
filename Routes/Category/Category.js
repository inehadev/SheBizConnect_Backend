const express = require('express');
const category = require('../../models/CategoryModel.js')
const protect = require('../../middleware/protect.js')
const categoryRouter = express.Router();

categoryRouter.post('/category' , protect ,  async (req,res )=>{
    const {type , img}=req.body;

    const existentCategory = await category.find({type});
    if(existentCategory){
    console.log("this category is already present");
    return res.status(400).json({message:" this  type of category already present"});
    }

    let category = new category ({
        type:type,
        img:img
    })

         const Category=  await category.save();
         return res.json({message :"the category is " , Category});

})

module.exports=categoryRouter;

