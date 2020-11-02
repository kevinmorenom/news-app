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

    topHeadlines(req, res) {
        let country = req.params.country || 'mx';
        const url = `${apiUrl}top-headlines?country=${country}&apiKey=${apiKey}`;
        axios.get(url).then(response => {
            res.send(response.data.articles);
        }).catch(err => {
            res.send('Failure');
            res.end();
        });
    }

    noticias(req, res) {
        let sources = req.params.sources || '';
        const url = `${apiUrl}everything?q=${req.query.search}&sources=${sources}&apiKey=${apiKey}`;
        console.log("url :", url);
        axios.get(url).then(response => {
            res.send(response.data.articles);
        }).catch(err => {
            res.send('Failure');
            res.end();
        });
    }

    sources(req, res) {
        let sources = req.params.sources || '';
        const url = `${apiUrl}sources?apiKey=${apiKey}`;
        console.log(url);
        axios.get(url).then(response => {
            res.send(response.data);
        }).catch(err => {
            res.send('Failure');
            res.end();
        });
    }

}

module.exports = new News();