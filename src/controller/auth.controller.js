"use-strict";

// JWT
//$ npm i jsonwebtoken
const User = require("../model/user");
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if ((username, password)) {
      const user = await User.findOne({ username, password });

      if (user) {
        //Login OK;

        const accessData = {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          image: user.image,
        };

        const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
          expiresIn: "20s",
        });

        const refreshData = {
          username: user.username,
          password: user.password,
        };
        const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
          expiresIn: "3d",
        });

        res.send({
          error: false,
          token: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("User not found");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter your user name and password ");
    }
  },

  refresh: async (req, res) => {
    
  },

  logout: async (req, res) => {
    res.send({
      error: false,
      message: "No need to logout.",
    });
  },
};
