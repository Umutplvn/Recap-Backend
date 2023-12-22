

"use strict"

const Blog = require('../model/blogPost')

module.exports={

list:async(req, res)=>{

        // const data=await Blog.find().populate('categoryId')
        
        //! Searching  URL?search[key1]=value1&search[key2]=value2
        //? https://www.mongodb.com/docs/manual/reference/operator/query/regex/

        const search =req.query?.search || {}
        for(let key in search) search[key]= {$regex: search[key], $options: "i"}  // icinde arama yapabilmek icin regex olarak yazdik

        //! Sorting   URL?sort[key1]=1&sort[key2]=-1 (1=ASC, -1=DESC)
        //? https://www.bmc.com/blogs/mongodb-sorting
        const sort = req.query?.sort || {}
        
        //! Pagination  URL?page=1&limit=10
        let limit= Number(req.query?.limit)
        limit=limit > 0 ? limit : Number (process.env?.PAGE_SIZE || 20)
        let page= Number(req.query?.page)
        page = (page > 0 ? page : 1 )-1

        let skip= Number(req.query?.skip) || (page*limit)


        const data=await Blog.find(search).sort(sort).skip(skip).limit(limit).populate('categoryId')

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