const express = require('express');
const router = express.Router();
const Thing = require('../Models/Thing');

//poster un nouvel item
router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
    //save est une methode fournie par mongoose
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  //modifier 1 item
  router.put('/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id},{...req.body, _id:req.params.id})
    .then(thing => res.status(200).json({message :'Objet modifié'}))
    .catch(error => res.status(400).json({error}));
  
  });
  
  //supprimer 1 item
  router.delete('/:id',(req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
    .then(thing => res.status(200).json({message:'Objet supprimé ! '}))
    .catch(error => res.status(400).json({error}));
    
  })
  
  //Récupérer 1 item
  router.get('/:id', (req, res, next) => {
    //req.params.id est l'id passé dynamiquement
    //findOne est une methode fournie par mongoose
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
    
  });
  
  //récupérer tous les items
  router.get('/', (req, res, next) => {
    //find est une méthode fournie par mongoose
      Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({error}));
    });



module.exports = router;