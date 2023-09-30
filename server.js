const express=require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app=express();
const firebaseRoute=require('./api/routes/firebase_route')
const userAuthRoute=require('./api/routes/user_auth')
const blogRoute=require('./api/routes/blogs_route')



app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use('/firebase',firebaseRoute);
app.use('/createUser',userAuthRoute);
app.use('/blog',blogRoute);


module.exports = app;