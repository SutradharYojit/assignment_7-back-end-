const express = require('express');
const admin = require('firebase-admin')
const router = express();
const fireStore = require('../../config')


router.post('/signUp', (req, res, next) => {

    const password = req.body.password;
    const data = req.body;
    delete req.body.password;
    admin.auth().createUser({
        email: data.email,
        password: password
    })
        .then(async (userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);
            await fireStore.db.collection('users').add({ ...data, uid: userRecord.uid });
            return res.status(201).json({ success: true, userId: userRecord.uid, data:data, message: 'User created successfully', });

        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return res.status(500).send({ status: false, message: 'Error creating user', errorInfo: error });
        });
});


// router.post('/logasddasdin', (req, res, next) => {
//     const data = req.body;

//     admin.auth().createUser({
//         email: data.email,
//         password: data.password
//     })
//         .then((userRecord) => {
//             console.log('Successfully created new user:', userRecord.uid);
//             return res.status(200).json({ success: true, userId: userRecord.uid, message: 'User created successfully', });
//         })
//         .catch((error) => {
//             console.error('Error creating user:', error);
//             return res.status(500).send({ status: false, message: 'Error creating user', errorInfo: error });
//         });
// });





module.exports = router;