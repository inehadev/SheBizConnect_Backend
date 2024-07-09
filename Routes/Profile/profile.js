const express = require('express');
const ProfileRoute = express.Router();
const Profile = require('../../models/ProfileModel');
const protect = require('../../middleware/protect');
const Category = require('../../models/CategoryModel');
const cloudinary = require('cloudinary').v2
const Rating = require('../../models/RatingModel')


/// api to create profile 

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
    profile.ratings.push(savedRating.rating);
    await profile.save();

    return res.status(200).json({ message: 'Rating added successfully', profile });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
    
  }
})

////api to get profile with profileId

ProfileRoute.get('/getprofile/:profileId' , async (req, res) => {
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


/// api to update profile

ProfileRoute.post('/updateProfile/:profileId' , protect ,async(req,res)=>{

  try {
    const {title, images , typeofp ,   contact , location}=req.body;
    
    const {profileId }= req.params;
    const updated_By = req.user;
    const {updated_to} = profileId;
  
    const profile=await Profile.findById(profileId);
     
    if(!profile){
      return res.status(400).json("profile is not found");
  
  
    }
  
    
      profile.title=title,
      profile.location=location,
      profile.images=images,
      profile.typeofp=typeofp,
       profile.contact = contact;
      profile.updated_By = updated_By;
      profile.updated_to = updated_to;

      const response = await profile.save();
      res.status(200).json(response);
  
    
  
    
  } catch (error) {
    console.log(error);
    
    
  }
})




module.exports = ProfileRoute;