const mongoose = require('mongoose');

const UpdateModel = new mongoose.Schema({
    updated_By:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    updated_to:{
        type:mongoose.Types.ObjectId,
        ref:'profile'
    },
   
    title:{
        type:String,
    },
    typeofp:{
        type:String
    },
    location:{
        type:String
    },
    contact:{
        type:Number,
    },
    gallery: [{
        type: String,
    }],
    item: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }]

    

})

const updateModel= mongoose.model('updateModel' , UpdateModel);
module.exports=updateModel;