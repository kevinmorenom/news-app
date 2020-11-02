const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
const axios = require('axios');
require('dotenv').config();

console.log('News Loaded!');

module.exports = function(app) {
    app.get('/recientes', function(req, res) {
        const url = `${apiUrl}top-headlines?country=mx&apiKey=${apiKey}`;
        axios.get(url).then(response => {
            res.render('index', {
                headline: response.data.articles
            });

        }).catch(err => {
            res.send('Failure');
        });

    });

    app.get('/', function(req, res) {

        const url = `${apiUrl}everything?q=ladygaga&sortBy=publishedAt&apiKey=${apiKey}`;
        axios.get(url).then(response => {
            res.render('news', {
                headline: response.data.articles
            });

        }).catch(err => {
            res.send('Failure');
        });

    });
}