const express=require ('express')
const user = require('../../models/UserModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter =express();
authRouter.post('/register' ,async (req,res)=>{
   try {
    const {name, username , email , password}=req.body;
    const exisitinguser = await  user.findOne({email });
    if(exisitinguser){
        return res.status(404).json(`email already present try login`);
    }
     const bcryptpass = await  bcrypt.hash(password , 10);
    const newUser = new user ({
        name , 
        username , 
        email , 
        password:bcryptpass

    })

    await newUser.save();

    if(newUser){
        res.status(200).json(newUser._doc)
    }
    
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
   }
    
})

authRouter.post('/login' , async(req , res)=>{
    try {

        const { username, email ,password }=req.body;
        const exisitinguser = await  user.findOne({username , email});
        if(!exisitinguser){
          return  res.status(400).json({message:'user not found'})
        }
       
        const ismatch =  await bcrypt.compare(password , exisitinguser.password);
        if(!ismatch){
            return res.status(400).json({message:'password doesnot match'})
        }
       
        const token =  jwt.sign({userId:exisitinguser._id} , "x-auth-token");
        if(token){
          return  res.status(200).json({user:exisitinguser , token})

        }
       
        return  res.status(500).json({ message: 'Failed to generate token' });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({ message: 'Server error' });
    }
})

module.exports= authRouter;