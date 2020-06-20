const express = require('express');
const router = express.Router();
const Article = require('../../models/Article');
const { route } = require('../articles');

// -------------------------- Get all articles -----------------------------------
router.get('/', async(req, res) => {
    articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.json(articles);
});

// -------------------------- Get one article --------------------------------------
// 1. Using a slug
router.get('/slug/:slug', async(req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if(article == null){
        res.status(400).json({msg: `No member with the slug as ${req.params.slug}`})
    }
    res.json(article);
});

// 2. Using an id
router.get('/id/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    if(article == null){
        res.status(400).json({msg: `No member with the id as ${req.params.id}`})
    }
    res.json(article);
});

// --------------------------- Delete an Article -------------------------------------
router.delete('/:id', async(req, res) => {
    const msg = await Article
    .findByIdAndDelete(req.params.id)
    .then(() => `Article with the id of ${req.params.id} has been deleted`);

    res.json({msg});
});



module.exports = router;