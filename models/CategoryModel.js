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
    profiles: 
         [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }],
      }
    
)

const Category = mongoose.model('Category' , categorySchema);
module.exports= Category;