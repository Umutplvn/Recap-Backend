"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("You must login first.");
    }
  },

  isOwner: (req, res, next) => {
    const userId = req.params?.id || null;
    if (req.user && req.user._id == userId) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "You must login first and you can only update or delete your own blogs."
      );
    }
  }
}
