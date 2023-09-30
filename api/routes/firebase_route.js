const express = require('express');
const router = express();
const firebase = require('../../config')


router.post('/add', async (req, res, next) => {
    const data = req.body;
    await firebase.db.collection('users').add(data)
        .then((value) => {
            return res.status(200).json({
                message: "Add successfully",
                data: value
            })
        });
});

router.get('/getAll', async (req, res, next) => {
    const snapShot = await firebase.db.collection('users').get();
    const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return res.status(200).json({ success: true, data: data });
});


router.post('/update', async (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    const update = req.body;
    const snapShot = await firebase.db.collection('users').doc(id).update(update);
    return res.status(200).json({ success: true, message: "data update successfullt" });

});


router.post('/delete', async (req, res, next) => {
    const id = req.body.id;

    await firebase.db.collection('users').doc(id).delete().then((value) => {
        console.log(value);
        return res.status(200).json({ success: true, message: "data delete successfullt" });
    });
});


module.exports = router;
