const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },

    title:{
        type:String,
    },
    img:{
        type:String
    },
    type:{
        type:String
    },
    location:{
        type:String
    }

})

const Profile = mongoose.model('Profile' , profileSchema);
module.exports=Profile;
