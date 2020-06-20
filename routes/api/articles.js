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

// ---------------------------- Adding and Updating an Article -------------------------------------
// Adding a new article 
router.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndShowMessage('Added'));


// Updating an Existing article
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndShowMessage('Updated'));

// Function that performs adding and updating
function saveArticleAndShowMessage(msg) {
    return async(req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        
        try {
            article = await article.save();
            res.json({msg : `Article ${msg} successfully.`})
        } catch (e) {
            res.json({msg : `Failed to ${msg} article.`})
        }
    }
}

module.exports = router;