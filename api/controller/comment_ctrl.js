const admin = require('firebase-admin');
const db = admin.database();
const commentsRef = db.ref('comments'); // Reference to the 'comments' node in the database

// add comments to the post 
addComment = (req, res, next) => {
    const { blogId, authorId, comment } = req.body; // Assuming your req.body has postId, author, and content

    if (!blogId || !authorId || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newCommentRef = commentsRef.push(); // Generate a unique key for the comment
    const timestamp = admin.database.ServerValue.TIMESTAMP; // Get a timestamp

    const commentData = {
        blogId,
        authorId,
        comment,
        timestamp,
    };
    newCommentRef.set(commentData)
        .then(() => {
            return res.status(200).json({ status: true, message: "comment added successfully" });
        })
        .catch((error) => {
            return res.status(200).json({ status: false, message: error });
        });
}

// function to get the commenty post by specific
getByPost = (req, res, next) => {
    const blogId = req.body.blogId;
    commentsRef.orderByChild('blogId').equalTo(blogId).on('value', (snapshot) => {
        const comments = [];
        snapshot.forEach((childSnapshot) => {
            comments.push(childSnapshot.val());
        });

        return res.status(200).json({ status: true, comments: comments });

    });
}



module.exports = { addComment ,getByPost}