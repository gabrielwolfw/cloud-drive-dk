'use strict'

var express = require('express');
var File = require('../controllers/objects');

//Se llama al objeto router de express

var router = express.Router();

//Rutas para los objetos articulo

router.post('/save',File.save);

router.get('/getFiles', File.getFiles);

router.delete('/delete/:id', File.delete);

module.exports = router;