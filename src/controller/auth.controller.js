"use-strict";

// JWT
//$ npm i jsonwebtoken
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const checkUserAndSetToken = require("../helpers/checkUserAndSetToken");

module.exports = {
  login: async (req, res) => {
    const checkUser = await User.findOne(req.body);
    if (checkUser.error) {
      res.errorStatusCode = 401;
      throw new Error(checkUser.message);
    } else {
      res.send(checkUser);
    }
  },

  refresh: async (req, res) => {
    const refreshToken = req.body?.token?.refresh || null;
    if (refreshToken) {
      const jwtData = jwt.verify(refreshData, process.env.REFRESH_KEY);
      if (jwtData) {
        const checkUser = await User.findOne(req.body);
        if (checkUser.error) {
          res.errorStatusCode = 401;
          throw new Error(checkUser.message);
        } else {
          res.send(checkUser);
        }
      }
    }
  },

  logout: async (req, res) => {
    res.send({
      error: false,
      message: "No need to logout.",
    });
  },
};
