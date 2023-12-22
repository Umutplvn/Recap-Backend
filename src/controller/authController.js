"use-strict"

// JWT
//$ npm i jsonwebtoken
const User=require('../model/user')

module.exprts={
    login: async(req, res)=>{

        const {username, password}= req.body
       
        if(username, password){
            const user=await User.findOne({username, password})

            if(user){

            //Login OK;

                const accessData={
                    _id:user._id,
                    name:user.name,
                    lastname:user.lastname,
                    image:user.image,
                }

                const refreshData={
                    username:user.username,
                    password:user.password,
                }



            }else{
                res.errorStatusCode=401
                throw new Error('User not found')
            }
        }else{
            res.errorStatusCode=401
            throw new Error('Please enter your user name and password ')
        }

    },

    refresh: async(req, res)=>{

    },

    logout: async(req, res)=>{

    },

}