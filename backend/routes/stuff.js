const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');


//poster un nouvel item
router.post('/', stuffCtrl.createThing);
    
  
//modifier 1 item
router.put('/:id', stuffCtrl.modifyThing);
  
//supprimer 1 item
router.delete('/:id',stuffCtrl.deleteThing);
  
//Récupérer 1 item
router.get('/:id', stuffCtrl.retrieveItem);
  
//récupérer tous les items
router.get('/', stuffCtrl.findItems);



module.exports = router;