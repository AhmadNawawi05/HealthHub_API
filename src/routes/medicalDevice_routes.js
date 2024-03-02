module.exports = app => {
  const medicalDevice = require('../controllers/medicalDevice_controller')

  var router = require('express').Router();

    // Create new medical device
    router.post("/", medicalDevice.create);

    // Retrieve all medical device
    router.get('/', medicalDevice.findAll);
  
    // // Retrieve all published medical device
    // router.get('/published', medicalDevice.findAllPublished);
  
    // Retrieve singe medical device by id
    router.get('/:id_device', medicalDevice.findOne);
  
    // Update medical device by id
    router.put('/update/:id_device', medicalDevice.update);
  
    // delete medical device by id
    router.delete('/delete/:id_device', medicalDevice.delete);
  
    // delete all medical device 
    router.delete('/deleteAll', medicalDevice.deleteAll);

  app.use('/api/device', router);
}