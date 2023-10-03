const express = require('express');
const router = express();
const blogCtrl = require('../controller/blog_ctrl')
// multer is used to get the data from the form data in body to get the upload image
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage })


// to get all blogs
router.get('/getAll', blogCtrl.getAllBlogs);

 // to upload the blog
router.post('/upload', upload.single('productImage'), blogCtrl.createBlog);


module.exports = router;

