const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('../models/product');
const productRouter = require('../routes/products.routes');
const User = require('../models/userModel');
const jsonwebtoken = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));



const auth=((req,res,next)=>{
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]=='JWT'){
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs',(err,decode)=>{
        if (err) {
            res.status(401).json({ message: 'Authentication failed!' });
            return;
        }
        req.user=decode;
        next();
      });
    } else{
      res.status(401).json({ message: 'Authentication failed!' });
      return;
      next();
    }
  })


  module.exports=auth;