const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    res.clearCookie("userId").send("logout");
  }
};
