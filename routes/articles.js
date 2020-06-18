const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Routes
router.get('/new', (req, res) => {
    res.render('articles/new');
});

router.post('/', (req, res) => {
    
});

module.exports = router;