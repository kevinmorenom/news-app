const express = require('express');
const axios = require('axios');
require('dotenv').config();
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class News {
    getAll(req, res) {
        const url = `${apiUrl}everything?q=ladygaga&sortBy=publishedAt&apiKey=${apiKey}`;
        axios.get(url).then(response => {
            res.send(response.data.articles);
        }).catch(err => {
            res.send('Failure');
            res.end();
        });
    }

    getByID(req, res) {
        res.send('Traer la noticia ' + req.params.id);
        res.end();
    }

}

module.exports = new News();