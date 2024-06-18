const mongoose=require('mongoose');
 
const categorySchema = new mongoose.Schema ({
    
    posted_by: {
        type :String,
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