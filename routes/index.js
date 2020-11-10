const express = require('express');
const router = express.Router();
const testController = require('../src/controllers/test.controller.js');
const newsController = require('./../src/controllers/news.controller');
//Agregado por el profe
const usersController = require('./../src/controllers/users.controller');

// router.get('/noticias', newsController.getAll);
// router.get('/noticias/:id', newsController.getByID);

//ENDPOINTS DE TAREA
router.get('/topheadlines/:country?', newsController.topHeadlines);
router.get('/noticias/:sources?', newsController.noticias);
router.get('/sources', newsController.sources);

router.get('airbnb', testController.getAll);
//endpoint agregados por el profe 
router.get('/users', usersController.index);

// Authentication
router.post('/auth', usersController.login);
router.post('/signup', usersController.signup);
router.post('/token', usersController.test);
module.exports = router;