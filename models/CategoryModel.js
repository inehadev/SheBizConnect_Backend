const mongoose=require('mongoose');
 
const categorySchema = new mongoose.Schema ({
    
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        require:true
    },
    CategoryType:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    profiles: {
        cooking: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        style: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        art: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        marketing: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        health: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }]
        // Add more categories as needed
    }
    
})

const Category = mongoose.model('Category' , categorySchema);
module.exports= Category;