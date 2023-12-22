
"use strict"

const Category = require('../model/category')

module.exports={

list:async(req, res)=>{

        // const data=await Category.find()
        const data= await req.getModelList(Category)

        res.status(200).send({
            error:false,
            categories:data,
            
        })

    },

create:async(req, res)=>{

        const data=await Category.create(req.body)
        
        res.status(201).send({
            error:false,
            category:data
        })
    },

read:async(req, res)=>{

        const data=await Category.findOne({_id:req.params.categoryId})

        res.status(200).send({
            error:false,
            category:data
        })
    },


update:async(req, res)=>{
        const data=await Category.updateOne({_id:req.params.categoryId}, req.body, { runValidators: true })

        res.status(202).send({
            error:false,
            category:await Category.findOne({_id:req.params.categoryId})

        })
    },

delete:async(req, res)=>{
        const data = await Category.findOne({_id:req.params.categoryId})

        if(data){
            await Category.deleteOne(data)
            res.send({
                error:false,
                message:'Successfully deleted',
                deleted_data:data
            })
        }else{
            res.send('Category Not Found')
        }
    }
}