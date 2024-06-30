const express = require('express');
const ProfileRoute = express.Router();
const Profile = require('../../models/ProfileModel');
const protect = require('../../middleware/protect');
const Category = require('../../models/CategoryModel');
const cloudinary = require('cloudinary').v2
const Rating = require('../../models/RatingModel')

ProfileRoute.post('/create', protect, async (req, res) => {
  try {
    const { title, typeofp, location,   categoryId } = req.body;
    let { img } = req.body;
     created_by = req.user;
     console.log(created_by)


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
    

  category.profiles.push(savedprofile._id);
  await category.save();


      return res.status(200).json({ message: "profile is created and saved in category ", savedprofile });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error })

  }

})

///////rating to profiles

ProfileRoute.post('/rate/:profileId' ,  protect , async(req,res)=>{
  try {
    const {profileId} = req.params;
     userId = req.user;

    const {rating} = req.body;
    if(!rating || rating < 1 ||  rating >5){
      return res.status(400).json({ message: 'Rating should be a number between 1 and 5' });
    }


    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    } 
    const newrating = new Rating({
      userId ,
      rating :rating,
    })
    
    const savedRating = await  newrating.save();
    profile.rating.push(savedRating._id);
    await profile.save();

    return res.status(200).json({ message: 'Rating added successfully', profile });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
    
  }
})



ProfileRoute.get('/getprofile/:profileId', protect , async (req, res) => {
  try {
    const {profileId}= req.params;
   
    const profile = await Profile.findById(profileId);
    if(!profile){
      console.log("profile not found");
      return res.status(400).json({message:"profile is not found"});
     
    }else{
      return res.status(200).json(profile);
    }



  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error });
  }
})





module.exports = ProfileRoute;