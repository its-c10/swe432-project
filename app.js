console.log('here');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/contact-us', (req, res) => {
    res.render('pages/contact-us');
});

app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});