const express = require('express');
const ProfileRoute = express.Router();
const Profile = require('../../models/ProfileModel');
const protect = require('../../middleware/protect');
const { default: mongoose } = require('mongoose');
const Category = require('../../models/CategoryModel');
const cloudinary = require('cloudinary').v2

ProfileRoute.post('/create', protect, async (req, res) => {
  try {
    const { title, typeofp, location,  categoryType, categoryId } = req.body;
    let { img } = req.body;
     created_by = req.user;


    const existentProfile = await Profile.findOne({ title, img });
    if (existentProfile) {
      return res.status(400).json({ message: "profile already existed" });
    }
    if (img) {
      const response = await cloudinary.uploader.upload(img);
      img = response.secure_url;
      console.log(response.secure_url);
    }

    const profile = new Profile({
      created_by,
      categoryId,
      categoryType,
      title: title,
      img: img,
      typeofp: typeofp,
      location: location

    })

   
    const savedprofile = await profile.save();
   
    const category= await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'CategoryId not found' });
    }
    
    if (!category.profiles[categoryType]) {
      return res.status(400).json({ message: 'Invalid profile type' });
    }

  category.profiles[categoryType].push(savedprofile._id);
  await category.save();


      return res.status(200).json({ message: "profile is created and saved in category ", savedprofile });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error })

  }

})

ProfileRoute.get('/getprofile', async (req, res) => {
  try {
    const allprofile = await Profile.find({});
    console.log(allprofile);
    return res.status(200).json({ message: "all profile are", allprofile });


  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error });
  }
})

module.exports = ProfileRoute;