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
        Cooking: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        Style: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        Art: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        Marketing: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
        Health: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }]
        // Add more categories as needed
    }
    
})

const Category = mongoose.model('Category' , categorySchema);
module.exports= Category;