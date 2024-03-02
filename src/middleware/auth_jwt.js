const jwt = require("jsonwebtoken");
const config = require("../config/auth_config");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message : "No token provided!"
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    // Check if the URL contains 'me' and replace it with the actual user ID
    if (req.url.includes('me')) {
      try {
        const user = await User.findByPk(decoded.id);
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        req.userId = user.id;
      } catch (error) {
        return res.status(500).send({ message: "Error retrieving user data", error: error });
      }
    } else {
      req.userId = decoded.id;
    }

    next();
  });
};

const isAdmin = (req, res, next) => {
  // Your existing isAdmin middleware code here
  isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin"){
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };
};

const isDoctor = (req, res, next) => {
  // Your existing isDoctor middleware code here
  isDoctor = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "doctor"){
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require Doctor Role!"
        });
      });
    });
  };
};

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDoctor: isDoctor
};
