const db = require("../models");
const device = db.medicalDevice;
const Category = db.categories;
const Op = db.Sequelize.Op;
 
// create and save new medical device
exports.create = (req, res) => {
  // validate request
  if (!req.body.device_name || !req.body.category_id) {
    res.status(400).send({
      message: "content cannot be empty!"
    });
    return;
  }
  
  // create medical device
  const devices = {
    device_name: req.body.device_name,
    price: req.body.price,
    description: req.body.description,
    manufacture: req.body.manufacture,
    stock: req.body.stock,
    image_url1: req.body.image_url1,
    image_url2: req.body.image_url2,
    image_url3: req.body.image_url3,
    image_url4: req.body.image_url4,
    category_id: req.body.category_id 
  };

  // save medical device into database
  device.create(devices)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error while creating medical device"
      });
    });
};

// retrieve all medical devices from database
exports.findAll = (req, res) => {
  device.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while retrieving medical devices"
      });
    });
};

// find single medical device by id
exports.findOne = (req, res) => {
  const id_device = req.params.id_device;

  device.findByPk(id_device, {
    include: {
      model: db.categories,
      attributes: ['id_category', 'category_name']
    },
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `cannot find medical device with id=${id_device}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error while retrieving medical device with id=" + id_device
      });
    });
};

// update medical device by id
exports.update = (req, res) => {
  const id_device = req.params.id_device;

  device.update(req.body, {
    where: { id_device: id_device }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Medical device was updated successfully"
        });
      } else {
        res.status(404).send({
          message: `Cannot update medical device with id=${id_device}. Maybe medical device was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating medical device with id=" + id_device
      });
    });
};

// delete medical device by id
exports.delete = (req, res) => {
  const id_device = req.params.id_device;

  device.destroy({
    where: { id_device: id_device }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Medical device was deleted successfully!"
        });
      } else {
        res.send({
          message: `cannot delete medical device with id=${id_device}. maybe medical device was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "could not delete medical device with id=" + id_device
      });
    });
};

// delete all medical devices from database
exports.deleteAll = (req, res) => {
  device.destroy({
    where: {},
    turncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} medical devices were deleted succesfully!` });
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error while removing all medical devices"
      });
    });
};

// find all published medical devices
exports.findAllPublished = (req, res) => {
  MedicalDevice.findAll({ 
    where: { published: true },
    include: {
      model: Category,
      attributes: ['id_category', 'category_name']
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error while retrieving published medical devices"
      })
    })
};
