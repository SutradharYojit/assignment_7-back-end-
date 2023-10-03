const admin = require('firebase-admin');
const db = admin.database();
const commentsRef = db.ref('comments'); // Reference to the 'comments' node in the database
const express = require('express');
const router = express();
const commentCtrl = require('../controller/comment_ctrl')

router.post('/Addcomments', commentCtrl.addComment);


router.get('/comments', commentCtrl.getByPost)

module.exports = router;

