"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
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

/* ------------------------------------------------------- */
//! Middlewares:

//* Accept JSON:
// app.use('/', express.json()) //alttaki ile ayni
app.use(express.json())


/* ------------------------------------------------------- *
//! Routes

app.get('/', (req,res)=>{
    res.send({
        error:false,
        message:"Welcome Personnel API"
    })
})


// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        session: req.session,
        isLogin: req.isLogin
    })
})

/* ------------------------------------------------------- */

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