'use strict'

const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const multer = require('multer')

const app = express();

const port = 5000;

var url = 'mongodb+srv://Javier:020402@cluster0.ys66u.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;


var objects_routes = require('./routes/objects');

//Cargar body-parser (middleware),  para analizar cuerpos a traves de la URL

app.use(bodyParse.urlencoded({extended: false}));

//Convertir cualquier peticion a formato .json
app.use(bodyParse.json());

//Activar CORS para permitir peticiones AJAX y HTPP desde el frontend
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

})

//Function to upload the files in the directory//

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'files/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })
  
  app.use(cors())
  
  app.post('/image', upload.single('file'), function (req, res) {
    res.json({})
  })

// Fuction to run the server web

app.use('/api', objects_routes);

mongoose.connect(url,{useNewUrlParser: true}).then(()=>{
    console.log('Connect to MongoDB success');
    app.listen(port, () =>{
        console.log('Launch app in Port ' + port);
    
    });
})
