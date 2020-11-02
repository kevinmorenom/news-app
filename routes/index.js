const express = require('express');
const router = express.Router();
const testController = require('../src/controllers/test.controller.js');
const newsController = require('./../src/controllers/news.controller');

router.get('/noticias', newsController.getAll);
router.get('/noticias/:id', newsController.getByID);


router.get('airbnb', testController.getAll);

module.exports = router;