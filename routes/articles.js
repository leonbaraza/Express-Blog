const express = require('express');
const router = express.Router();
const Article = require('./../models/Article');

// Routes
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

// Display a single article
router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    console.log(article);
    if (article == null){
        res.redirect('/');
    }
    res.render('articles/show', { article:article });        
    // res.send(req.params.id);
});

// Save records in the database
router.post('/', async (req, res) => {
    // Create a new article
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        // assigns an id to the new article
        article = await article.save();
        // redirect to that article
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        console.log(e);
        res.render('articles/new', {article: article})
    }
});

module.exports = router;