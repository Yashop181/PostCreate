const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
router.get('/posts', async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const posts = await Post.find().skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments();
    
        res.json({
          posts,
          totalPages: Math.ceil(totalPosts / limit),
          currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;