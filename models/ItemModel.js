const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    created_by:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user'
    },
    profileId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'profile'
    },
    img:{
        type:String,
    },
    price:{
        type:Number,
    },
    name:{
        type:String
    }
    
})

const Item = mongoose.model('Item' , ItemSchema);
module.exports=Item;