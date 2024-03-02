module.exports = app => {
  const category = require('../controllers/category_controller');

  var router = require('express').Router();

  // Create new drugs
  router.post("/", category.create);

  // Retrieve all drugs
  router.get('/', category.findAll);

  // // Retrieve all published drugs
  // router.get('/published', category.findAllPublished);

  // Retrieve singe drugs by id
  router.get('/:id_category', category.findOne);

  // Update drugs by id
  router.put('/update/:id_category', category.update);

  // delete drugs by id
  router.delete('/delete/:id_category', category.delete);

  // delete all drugs 
  router.delete('/deleteAll', category.deleteAll);

  app.use('/api/category', router);
};