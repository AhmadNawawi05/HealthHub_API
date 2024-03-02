const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateNameorEmail = (req, res, next) => {
  // name
  User.findOne({
    where: {
      name: req.body.name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Name alredy in use!"
      });
      return;
    }

  // email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Email alredy in use!"
      });
      return;
    }
    next()
  });
  });
};

checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; 1 < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: " Role not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateNameorEmail: checkDuplicateNameorEmail,
  checkRoleExisted: checkRoleExisted
};

module.exports = verifySignUp