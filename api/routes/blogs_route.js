const express = require('express');
const admin = require('firebase-admin')
const router = express();
const fireStore = require('../../config');


router.post('/addblog', async (req, res, next) => {
    const data = req.body;
     fireStore.db.collection('blogs').add(data)
        .then(() => {
            return res.status(201).json({ success: true, message: 'Blog created successfully', });
        });
})

router.get('/getAll', async (req, res, next) => {
    const snapShot = await fireStore.db.collection('blogs').get();
    const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return res.status(200).json({ success: true,count:data.length ,data: data });
});


module.exports=router;
