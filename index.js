require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 3004;
const news = require('./news');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const MongoConnect = require('./src/controllers/db.controller');
const apiRoutes = require('./routes');
const cors = require('cors');
// const apiNews = require('./api');
// app.use('/api', apiNews);

news(app);
app.use(cors());
app.use('/api', apiRoutes);
app.use('/api', jsonParser);
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');


app.get('/airbnb', function(req, res) {
    MongoConnect('listingsAndReviews')
        .then(
            function(collection) {
                collection.find(function(results) {
                    res.send(results);
                });
            }
        )
        .catch(function() {
            res.send("ERROR");
        });
});

app.listen(port, () => {
    console.log('App is runnings in port ' + port);
});