module.exports = app => {
  const drugs = require('../controllers/drugs_controller');

  var router = require('express').Router();

  // Create new drugs
  router.post("/", drugs.create);

  // Retrieve all drugs
  router.get('/', drugs.findAll);

  // // Retrieve all published drugs
  // router.get('/published', drugs.findAllPublished);

  // Retrieve singe drugs by id
  router.get('/:id_drugs', drugs.findOne);

  // Update drugs by id
  router.put('/update/:id_drugs', drugs.update);

  // delete drugs by id
  router.delete('/delete/:id_drugs', drugs.delete);

  // delete all drugs 
  router.delete('/deleteAll', drugs.deleteAll);

  app.use('/api/drugs', router);
};