"use strict"
const mongoose =require('mongoose')

const blogSchema = new mongoose.Schema({

categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
},

title:{
    type:String,
    trim:true,
    required:true
},

content:{
    type:String,
    trim:true,
    required:true
}


},
{collection:'Blog', timestamps:{createdAt:'create_time', updatedAt:'update_time'}})

module.exports = mongoose.model('Blog', blogSchema)