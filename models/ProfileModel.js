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
    img:{
        type:String
    },
    typeofp:{
        type:String
    },
    location:{
        type:String
    },
    ratings:{
        type:[Number],
        ref:'rating',
        default : []
    },
    AddItem:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Item'
    }

})

const Profile = mongoose.model('Profile' , profileSchema);
module.exports=Profile;
