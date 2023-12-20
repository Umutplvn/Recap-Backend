"use strict"

const User = require('../model/user')

module.exports={

list:async(req, res)=>{

        const data=await User.find()

        res.status(200).send({
            error:false,
            Users:data,
            
        })

    },

create:async(req, res)=>{

        const data=await User.create(req.body)
        
        res.status(201).send({
            error:false,
            createdData:req.body,
            User:data
        })
    },

read:async(req, res)=>{

        const data=await User.findOne({_id:req.params.userId})

        res.status(200).send({
            error:false,
            User:data
        })
    },


update:async(req, res)=>{
        const data=await User.updateOne({_id:req.params.userId}, req.body, { runValidators: true })

        res.status(202).send({
            error:false,
            User:await User.findOne({_id:req.params.userId})

        })
    },

delete:async(req, res)=>{
        const data = await User.findOne({_id:req.params.userId})

        if(data){
            await User.deleteOne(data)
            res.send({
                error:false,
                message:'Successfully deleted',
                deleted_data:data
            })
        }else{
            res.send('User Not Found')
        }
    }
}