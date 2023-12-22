"use strict";

const User = require("../model/user");

module.exports = {

  list: async (req, res) => {
    
    const data= await req.getModelList(User)

    res.status(200).send({
      error: false,
      Users: data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      createdData: req.body,
      User: data,
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).send({
      error: false,
      User: data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      User: await User.findOne({ _id: req.params.userId }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id })

    res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data
    })
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({email: email, password:passwordEncrypt(password)}) buna gerek yok cunku modelde set metodunu kullalndiigimiz icin buna gerek yok
      const user = await User.findOne({ email: email, password: password });
      if (user) {

        req.session={
            user:{
                email: user.email,
                password: user.password
            }
        }
        if(req.body?.rememberMe){
            req.sessionOptions.maxAge= 1000*60*60*24*3 //3 days
        }

        res.status(200).send({
          error: false,
          result: user,
        })
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not valid.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },

  logout: async(req, res)=>{
    req.session = null, // cookie-session
    res.status(200).send({
        error:false
    })
}
};
