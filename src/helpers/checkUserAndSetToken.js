"user strict"

module.exports =async function(userData){
    const { username, password } = userData;

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
          expiresIn: "30d",
        });

        const refreshData = {
          username: user.username,
          password: user.password,
        };
        const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
          expiresIn: "3d",
        });

        return({
          error: false,
          token: {
            accessToken,
            refreshToken,
          },
        });
      } else {
       return({
            error:true,
            message: "User not found"
      }) 
      }
    } else {
        return({
            error:true,
            message: "Please enter your user name and password "
      }) 
    }
}