const express=require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app=express();
const userAuthRoute=require('./api/routes/user_auth')
const blogRoute=require('./api/routes/blogs_route')
const commentRoute=require('./api/routes/comment_route')


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use('/createUser',userAuthRoute);// createh user middleware
app.use('/blog',blogRoute);// add blog middleware
app.use('/comment',commentRoute);// add comment middleware

module.exports = app;