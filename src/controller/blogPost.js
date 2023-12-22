"use strict"

const Blog = require('../model/blogPost')

module.exports={

list:async(req, res)=>{

        const data= await req.getModelList(Blog, "categoryId")

        res.status(200).send({
            count:data.length,
            error:false,
            categories:data,
            
        })

    },

create:async(req, res)=>{

        const data=await Blog.create(req.body)
        
        res.status(201).send({
            error:false,
            blog:data
        })
    },

read:async(req, res)=>{

        const data=await Blog.findOne({_id:req.params.blogId}).populate('categoryId')

        res.status(200).send({
            error:false,
            blog:data
        })
    },


update:async(req, res)=>{
        const data=await Blog.updateOne({_id:req.params.blogId}, req.body, { runValidators: true })

        res.status(202).send({
            error:false,
            blog:await Blog.findOne({_id:req.params.blogId})

        })
    },

delete:async(req, res)=>{
        const data = await Blog.findOne({_id:req.params.blogId})

        if(data){
            await Blog.deleteOne(data)
            res.send({
                error:false,
                message:'Successfully deleted',
                deleted_data:data
            })
        }else{
            res.send('Blog Not Found')
        }
    }
}