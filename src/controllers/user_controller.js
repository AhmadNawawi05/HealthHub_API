// controllers/user_controller.js

const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content");
};

exports.doctorBoard = (req, res) => {
  res.status(200).send("Doctor Content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("admin Content");
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user data", error: error });
  }
};


exports.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving users."
      });
    });
};



