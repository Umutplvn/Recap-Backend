"use strict"
/* -------------------------------------------------------
    EXPRESS - Blog API
------------------------------------------------------- */

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// envVariables to process.env:
require('dotenv').config()
const PORT = process.env.PORT || 8000

//* asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
//! Configrations:

//* Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

//* Searching, sorting, pagination
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
//! Middlewares:

//* Accept JSON:
// app.use('/', express.json()) //alttaki ile ayni
app.use(express.json())
/* ------------------------------------------------------- *

//$ npm i cookie-session

const session = require('cookie-session')

app.use(session({
    secret:process.env.SECRET_KEY || "secret_Key_For_Cookies",
    // name:'cookie  //default: req.session
    // maxAge: 1000*60*60*24 //1 day (milisecond)
}))

/* ------------------------------------------------------- */
//Session Cookies yerine jwt ile kontrol
const jwt = require('jsonwebtoken')

app.use((req, res, next)=>{
    const auth= req.headers?.authorization || null
    const accessToken= auth ? auth.split(' ')[1] : null // jwt tokeni aldik

    jwt.verify(accessToken, process.env.ACCESS_TOKEN, function(err, user){
        if(err){
            req.user =null
            console.log('JWT Login: NO');
        }else{
            req.user = user
            console.log('JWT Login: YES');
        }
    })

    next()
})


/* ------------------------------------------------------- */

app.use('/auth', require('./src/routes/auth.router'))
app.use('/user', require('./src/routes/user'))
app.use('/category', require('./src/routes/category'))
app.use('/blog', require('./src/routes/blogPost'))

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()