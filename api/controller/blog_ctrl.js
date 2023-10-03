const express = require('express');
const fireStore = require('../firebase_config/config');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();


// get all blogs function
getAllBlogs = async (req, res, next) => {
  const snapShot = await fireStore.db.collection('blogs').get();
  const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return res.status(200).json({ success: true, count: data.length, data: data });
}

// create a new blog function
createBlog = async (req, res) => {
  const data = req.body;
  const filePath = req.file;
  console.log(req.body);
  // const file = bucket.file(filePath.path);
  const destinationPath = 'blogImages/' + filePath.originalname;
  if (!filePath) {
    return res.status(400).send('No file uploaded.');

  }// The path where you want to store the file in Firebase Storage

  bucket.upload(filePath.path, {
    destination: destinationPath,
    metadata: {
      contentType: filePath.mimetype,
    },
  })
    .then((image) => {
      console.log(image);
      console.log('File uploaded successfully.');
      return image[0].getMetadata(); // Get metadata for the uploaded file
    })
    .then((metadata) => {
      const downloadURL = metadata[0].mediaLink;
      console.log('Download URL: ' + downloadURL);

      fireStore.db.collection('blogs').add({ ...data, imageUrl: downloadURL })
        .then(() => {
          return res.status(201).json({ success: true, message: 'Blog created successfully', });
        });
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    });
}



module.exports = { getAllBlogs,createBlog}