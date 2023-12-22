"use strict"

const router=require('express').Router()
const Blog = require('../controller/blogPost')
const permissions=require('../middlewares/permissions')

router.route('/')
.get(Blog.list)
.post(permissions.isLogin, Blog.create)

router.route('/:blogId')
.get(permissions.isLogin, Blog.read)
.put(Blog.update)
.delete(Blog.delete)

module.exports= router
