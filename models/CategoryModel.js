const mongoose=require('mongoose');
 
const categorySchema = new mongoose.Schema ({
    
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    type:{
        type:'String'
    },
    image:{
        type:'String'
    }
    
})

const category = mongoose.model('category' , categorySchema);
module.exports= category;