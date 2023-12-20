"use strict"
const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({

userName:{
    type:String,
    trim:true,
},

password:{
    type:String,
    trim:true,
}

},
{collection:'Users', timestamps:{createdAt:'create_time', updatedAt:'update_time'}})

module.exports = mongoose.model('User', userSchema)