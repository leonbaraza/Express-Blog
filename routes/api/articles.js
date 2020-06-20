const express = require('express');
const router = express.Router();
const Article = require('../../models/Article');

// Get all articles
router.get('/', async(req, res) => {
    articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.json(articles);
});


module.exports = router;