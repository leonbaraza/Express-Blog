const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/Article');


const app = express();
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Set view engine
app.set('view engine', 'ejs');

// In order to access all the options from the form use the below code.
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', { text: 'Hello', articles });
});

// use routes
app.use('/articles', articleRouter);

// Define the port and listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));