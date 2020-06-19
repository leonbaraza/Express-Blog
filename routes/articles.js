const express = require('express');
const router = express.Router();
const Article = require('./../models/Article');
const { findById } = require('./../models/Article');

// Routes
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

// Edit
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article });
});


// Display a single article
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    console.log(article);
    if (article == null) {
        res.redirect('/');
    }
    res.render('articles/show', { article: article });
    // res.send(req.params.id);
});

// Save records in the database
router.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

// Delete
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    try {
        // assigns an id to the new article
        article = await article.save();
        // redirect to that article
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        console.log(e);
        res.render(`articles/${path}`, { article: article })
    }
}
}


module.exports = router;