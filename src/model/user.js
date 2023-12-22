"use strict"
const mongoose =require('mongoose')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const userSchema = new mongoose.Schema({

username:{
    type:String,
    trim:true,
    required:true,
    // validate:[ 
    //     (email)=> (email.includes('@') && email.includes('.')), 'Email is not valid'
    //     // (email)=>{ return (email.indexOf('@' && email.indexOf('.')))}, 'Email is not valid'
    // ]
},

password:{
    type:String,
    trim:true,
    required:true,
    set:(password)=>passwordEncrypt(password)

},

rememberMe:{
    type:Boolean,
    required:false
},

name:{
    type:String,
    trim:true,
    required:true,
},

lastname:{
    type:String,
    trim:true,
    required:true,
},

image:{
    type:String,
    trim:true,
    required:true,
}

},
{collection:'Users', timestamps:{createdAt:'create_time', updatedAt:'update_time'}})

module.exports = mongoose.model('User', userSchema)