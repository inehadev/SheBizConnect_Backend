const mongoose = require('mongoose');

const Visitprofile = new mongoose.Schema({
    profile:{
        type:mongoose.Schema.ObjectId,
        ref:'profile',
    },
    gallery:{
        type:[String]
    },
    item:{
        type:mongoose.Types.ObjectId,
        ref:'item'
    }
})

const visitProfile = new mongoose.model('visitProfile' , Visitprofile);
model.exports = visitProfile;