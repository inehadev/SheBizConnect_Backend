const mongoose=require('mongoose');
const UserModel = require('./UserModel');
const RatingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        require:true,
    },
    
    rating: {
        type: Number,
        required: true
      }

})

const rating = mongoose.model('rating' , RatingSchema);
module.exports=rating;