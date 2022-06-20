'use strict'

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FileSchema = new Schema({
  
    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    author : String,
    labels: String,
    FileURL : String

});

module.exports = mongoose.model('File', FileSchema);