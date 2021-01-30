const express = require('express');
const scientists = require('./models/scientists');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log('Middleware');
    next();
});

app.get('/', (req, res) => {
    res.render('index.ejs', {scientists: scientists});
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});


app.post('/', (req, res) => {
    scientists.push(req.body)
    res.redirect('/')
});

app.get('/:index/edit', (req, res) => {
    res.render('edit.ejs', {
        scientist: scientists[req.params.index],
        index: req.params.index
    })
})

app.delete('/:index', (req, res) => {
    scientists.splice(req.params.index, 1); //remove the item from the array
    res.redirect('/');  //redirect back to index route
});

app.put('/:index', (req, res) => {
    scientists[req.params.index] = req.body;
    res.redirect('/');
})

app.listen(port, () => {
    console.log('Scanning uncharted planet...')
});