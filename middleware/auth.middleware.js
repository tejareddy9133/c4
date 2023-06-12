const jwt = require("jsonwebtoken");
const { BlackModel } = require("../model/black.model");

const authentication = async (req, res, next) => {
  const token = req.headers.authourization.split(" ")[1];
  const black = await BlackModel.find({ token });
  if (black.length > 0) {
    res.send({ msg: "login again" });
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, "teja");
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.user = decoded.username;
        next();
      } else {
        res.json({ msg: "not authenticated" });
      }
    } catch (error) {
      res.json({
        msg: error.message,
      });
    }
  } else {
    res.json({ msg: "please login again" });
  }
};
module.exports = { authentication };
