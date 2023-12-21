"use strict"
const mongoose =require('mongoose')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const userSchema = new mongoose.Schema({

email:{
    type:String,
    trim:true,
    unique:true,
    required:true,
    validate:[ 
        (email)=> (email.includes('@') && email.includes('.')), 'Email is not valid'
        // (email)=>{ return (email.indexOf('@' && email.indexOf('.')))}, 'Email is not valid'
    ]
},

password:{
    type:String,
    trim:true,
    required:true,
    set:(password)=>passwordEncrypt(password)

}

},
{collection:'Users', timestamps:{createdAt:'create_time', updatedAt:'update_time'}})

module.exports = mongoose.model('User', userSchema)