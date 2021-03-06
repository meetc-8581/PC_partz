const { User } = require("../models/userModel");

module.exports = async function (req, res, next) {
  let user = await User.findOne({ _id: req.user._id });

  if (user) {
    if (!user.isAdmin) {
      res.status(200).send(false);
    }
  }

  next();
};
