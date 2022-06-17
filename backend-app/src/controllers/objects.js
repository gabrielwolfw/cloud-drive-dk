'use strict'
const path = require('path');
var File = require('../models/objects');


//Crear objeto para disponer de los metodos de ruta

var controller = {

    //metodo para guardar el objeto
    save: (req, res)=>{
        var params = req.body;

        var file = new File();
        //Asignar valores

        file.title = params.title;
        file.content = params.content;
        file.author = params.author;

        //Guardar articulo
        file.save((error, fileStored)=>{

            if(error || !fileStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'File not save'
                })
            }

            return res.status(200).send({
                status: 'success',
                fileStored
            });

        });

    },

    //metodo para listar los objetos files

    getFiles: (req,res)=>{
        //El find se pueden agregar filtro como fechas, autores , etc...
        var query = File.find({});

        query.sort('-date').exec((error, files)=>{
            if(error){
                return res.status(500).send({
                    status: 'error',
                    message: 'Extract data fail'
                });
            }

            if(!files){
                return res.status(404).send({
                    status: 'error',
                    message: 'Not found files to show'

                });
            }

            return res.status(200).send({
                status: 'success',
                files
            });
        });
    },

    //metodo para eliminar un file a traves del id

    delete: (req, res)=>{
        //Tomar el id por la URL

        var fileId = req.params.id;

        File.findOneAndDelete({_id:fileId}, (error,fileRemoved)=>{
            if(error){
                return res.status(500).send({
                    status: 'error',
                    message: 'Delete fail'
                });
            }

            if(!fileRemoved){
                return status(404).send({
                    status: 'error',
                    message: 'File not found to delete'
                });

            }
            return res.status(200).send({
                status: 'success',
                article: fileRemoved
            });
        });
    }
}

module.exports = controller;