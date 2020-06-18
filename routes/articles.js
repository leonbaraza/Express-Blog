const express = require('express');
const router = express.Router();

// Routes
router.get('/new', (req, res) => {
    res.render('articles/new');
});

router.post('/', (req, res) => {
    
});

module.exports = router;