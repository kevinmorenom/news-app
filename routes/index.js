const express = require('express');
const router = express.Router();
const testController = require('../src/controllers/test.controller.js');
const newsController = require('./../src/controllers/news.controller');

// router.get('/noticias', newsController.getAll);
// router.get('/noticias/:id', newsController.getByID);

//ENDPOINTS DE TAREA
router.get('/topheadlines/:country?', newsController.topHeadlines);
router.get('/noticias/:sources?', newsController.noticias);
router.get('/sources', newsController.sources);

router.get('airbnb', testController.getAll);

module.exports = router;