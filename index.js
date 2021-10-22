const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('./models/product');
const productRouter = require('./routes/products.routes');
const User = require('./models/userModel');
const jsonwebtoken = require("jsonwebtoken");
const auth=require('./middleware/auth');
const userRouter=require('./routes/user.routes');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017');
const db = mongoose.connection; //object
db.on('error', console.error.bind(console, 'connection error:')); //whenever an error, this handler
db.once('open', function() {
    console.log('we are connected') // DB connected prompt
  // we're connected!
});

app.use('/auth',userRouter);
app.use('/product',auth, productRouter);

app.listen(3040, () => {
  console.log('running successfully on port 3040');
})


