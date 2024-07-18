const express= require('express');
const visitRouter = express.Router();
const profile = require('../../models/ProfileModel');
const protect = require('../../middleware/protect');


visitRouter.get('/visit/:profileId'  , async(req,res)=>{

    try {

        const {profileId}= req.params;
    const Profile = await profile.findById(profileId)
    // .populate('AddItem') 
            .populate('AddGallery');;
            if (Profile) {
                res.status(200).json({ AddGallery: Profile.AddGallery });
                console.log(`the visitProfile AddGallery: ${Profile.AddGallery}`);
    console.log(`the visitptofile ${Profile}`);
            }
        
    } catch (error) {
        console.log(error);
        
    }


    
    
})

module.exports=visitRouter;