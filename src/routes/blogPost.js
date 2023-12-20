"use strict"

const router=require('express').Router()
const Blog = require('../controller/blogPost')

router.route('/')
.get(Blog.list)
.post(Blog.create)

router.route('/:blogId')
.get(Blog.read)
.put(Blog.update)
.delete(Blog.delete)

module.exports= router
