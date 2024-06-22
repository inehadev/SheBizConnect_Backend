const express = require('express');
const jwt = require('jsonwebtoken');

const protect = async(req,res,next)=>{
   try {
    const token = req.header('x-auth-token');
    if(!token){
        console.log(" token not found");
    }
    const isverified = jwt.verify(token , (process.env.SecretKey));

    if(!isverified){
        console.log('not verified toekn');
        return res.status(400).json(`token is not verified`);
        
    }
     req.token = token;
     req.user=isverified.userId
     
    console.log({message:"user token is" , token});
    console.log(req.user);
    next();
    
   } catch (error) {
    console.log("Token is not verified");
    return res.status(400).json({message:"Toekn is not verified"});
    
   }
}

module.exports=protect;
