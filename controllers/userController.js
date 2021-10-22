const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/userModel');


const register=(req,res)=>{
    const newUser=new User(req.body);
    newUser.hash_password=bcrypt.hashSync(req.body.password, 10);
    newUser.save((err,user)=>{
        if (err){
            return res.status(400).send({
                message: err
              });
        }
        else{
            user.hash_password = undefined;
            return res.json(user);
        }
    })
};

const sign_in=(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        else if (user){
            if (user.comparePassword(req.body.password)){
                return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
            }
            else{
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }
        }
    })
};


const loginRequired=(req,res,next)=>{
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
};

module.exports={register,sign_in,loginRequired};