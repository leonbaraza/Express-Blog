const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const articleApi = require('./routes/api/articles');
const Article = require('./models/Article');
const methodOverride = require('method-override');

const app = express();
mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

// Set view engine
app.set('view engine', 'ejs');

// In order to access all the options from the form use the below code.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// user override
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    articles = await Article.find().sort({
        createdAt: 'desc'
    }); 
    res.render('articles/index', { text: 'Hello', articles });
});

// View routes
app.use('/articles', articleRouter);

// Article API routes
app.use('/api/articles', articleApi);

// Define the port and listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));