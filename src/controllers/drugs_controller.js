const db = require("../models");
const drugs = db.drugs;
const Category = db.categories;
const Op = db.Sequelize.Op;

 
// create and save new drugs
exports.create = (req, res) => {
  // validate request
  if (!req.body.drugs_name || !req.body.category_id) {
    res.status(400).send({
      message : "content cannot be empty!"
    });
    return
  }
  // create drugs
  const drug = {
    drugs_name : req.body.drugs_name,
    price : req.body.price,
    description : req.body.description,
    indication : req.body.indication,
    compisition: req.body.compisition,
    dosage : req.body.dosage,
    usage_guideline : req.body.usage_guideline,
    warning : req.body.warning,
    contra_indication : req.body.contra_indication,
    side_effect : req.body.side_effect,
    product_class : req.body.product_class,
    manufacture : req.body.manufacture,
    regist_code : req.body.regist_code,
    stock : req.body.stock,
    image_url1 : req.body.image_url1,
    image_url2 : req.body.image_url2,
    image_url3 : req.body.image_url3,
    image_url4 : req.body.image_url4,
    category_id: req.body.category_id 
  };

  // save drugs into database
  drugs.create(drug)
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message : err.message || "error while creating drugs"
      });
    });
};

// retrieve all drugs from database
exports.findAll = (req, res) => {
  drugs.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while retrieving drugs"
      });
    });
};

// find single drugs by id
exports.findOne = (req, res) => {
  const id_drugs = req.params.id_drugs;

  drugs.findByPk(id_drugs, {
    include: {
      model: db.categories, // Menggunakan db.categories untuk memuat kategori
      attributes: ['id_category', 'category_name']
    },
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message : `cannot find drugs with id=${id_drugs}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message : "error while retrieving drugs with id= " + id_drugs
      });
    });
};


// update, delete dan published belum di susuaikan dengan kategori

// update drugs by id
exports.update = (req, res) => {
  const id_drugs = req.params.id_drugs;

  drugs.update(req.body, {
    where: { id_drugs: id_drugs }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drugs was updated successfully"
        });
      } else {
        res.status(404).send({
          message: `Cannot update drugs with id=${id_drugs}. Maybe drugs was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating drugs with id=" + id_drugs
      });
    });
};


// delete drugs by id
exports.delete = (req, res) => {
  const id_drugs = req.params.id_drugs;

  drugs.destroy({
    where: { id_drugs: id_drugs }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "drugs was deleted successfully!"
        });
      } else {
        res.send({
          message: `cannot delete drugs with id=${id_drugs}. maybe drugs was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "could not delete drugs with id=" + id_drugs
      });
    });
};

//delete all drugs from database
exports.deleteAll = (req, res) => {
  drugs.destroy({
    where: {},
    turncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} drugs were deleted succesfully!` });
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error while removing all drugs"
      });
    });
};

// find all published drugs
exports.findAllPublished = (req, res) => {
  drugs.findAll({ 
    where: { published: true },
    include : {
      model : Category,
      attributes : ['id_category', 'category_name']
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "error while retriving drugs by published"
      })
    })
};