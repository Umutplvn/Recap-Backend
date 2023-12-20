"use strict"

const router=require('express').Router()
const Category = require('../controller/category')

router.route('/')
.get(Category.list)
.post(Category.create)

router.route('/:categoryId')
.get(Category.read)
.put(Category.update)
.delete(Category.delete)

module.exports= router
