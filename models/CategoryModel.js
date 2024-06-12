const mongoose=require('mongoose');
 
const categorySchema = new mongoose.Schema ({
    
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    CategoryType:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
    
})

const Category = mongoose.model('Category' , categorySchema);
module.exports= Category;