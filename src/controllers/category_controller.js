const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// create and save new category
exports.create = (req, res) => {
  // validate request
  if (!req.body.category_name) {
    res.status(400).send({
      message: "content cannot be empty!"
    });
    return;
  }

  // create category
  const category = {
    category_name: req.body.category_name,
    parent_category_id: req.body.parent_category_id
  };

  // save category into database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error while creating category"
      });
    });
};

// retrieve all categories from database
exports.findAll = (req, res) => {
  Category.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error while retrieving categories"
      });
    });
};

// find single category by id
exports.findOne = (req, res) => {
  const id_category = req.params.id_category;

  Category.findByPk(id_category)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `cannot find category with id=${id_category}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error while retrieving category with id=" + id_category
      });
    });
};

// update category by id
exports.update = (req, res) => {
  const id_category = req.params.id_category;

  Category.update(req.body, {
    where: { id_category: id_category }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "category was updated successfully"
        });
      } else {
        res.status(404).send({
          message: `cannot update category with id=${id_category}. maybe category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error updating category with id=" + id_category
      });
    });
};

// delete category by id
exports.delete = (req, res) => {
  const id_category = req.params.id_category;

  Category.destroy({
    where: { id_category: id_category }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "category was deleted successfully!"
        });
      } else {
        res.send({
          message: `cannot delete category with id=${id_category}. maybe category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "could not delete category with id=" + id_category
      });
    });
};

// delete all categories from database
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} categories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error while removing all categories"
      });
    });
};
