const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        require:true
    },

    title:{
        type:String,
    },
   
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    profileImg:{
        type:String
    },
    typeofp:{
        type:String
    },
    location:{
        type:String
    },
   
    AddItem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    contact:{
        type:Number
    },
    AddGallery: [{
        url:{
            type:String
        }
    }]
    

})

const Profile = mongoose.model('Profile' , profileSchema);
module.exports=Profile;
