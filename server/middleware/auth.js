const jwt = require("jsonwebtoken");

const secretKeyAdmin = "rbje4PkCZb2Fzqsj9OFJtjBw5TM";
const secretKeyUsers = "tA0vNplLmEwPhwpPo32upeCl";

const authenticateJwtAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secretKeyAdmin, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  const authenticateJwtUsers = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secretKeyUsers, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  module.exports = {
    authenticateJwtAdmin, authenticateJwtUsers,secretKeyAdmin,secretKeyUsers
  }