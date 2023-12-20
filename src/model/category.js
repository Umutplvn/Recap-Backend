"use strict"
const mongoose =require('mongoose')

const categorySchema = new mongoose.Schema({

title:{
    type:String,
    trim:true,
    required:true
},

published:{
    type:Boolean,
    required:true
}
},
{collection:'category', timestamps:{createdAt:'create_time', updatedAt:'update_time'}})

module.exports = mongoose.model('Category', categorySchema)