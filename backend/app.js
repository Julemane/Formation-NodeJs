const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./Models/Thing');
const dotenv = require('dotenv').config();


//connexion à la DB mongoDB à l'aide de mongoose
const app = express();
mongoose.connect('mongodb+srv://'+process.env.MONGODB_USER+':'+process.env.MONGODB_KEY+'@nodeformation.ahmq2ht.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//setting des headers pour supprimer les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//posté un nouvel item
app.post('/api/stuff', (req, res, next) => {
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
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({_id: req.params.id},{...req.body, _id:req.params.id})
  .then(thing => res.status(200).json({message :'Objet modifié'}))
  .catch(error => res.status(400).json({error}));

});

//supprimer 1 item
app.delete('/api/stuff/:id',(req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
  .then(thing => res.status(200).json({message:'Objet supprimé ! '}))
  .catch(error => res.status(400).json({error}));
  
})

//Récupérer 1 item
app.get('/api/stuff/:id', (req, res, next) => {
  //req.params.id est l'id passé dynamiquement
  //findOne est une methode fournie par mongoose
  Thing.findOne({_id: req.params.id})
  .then(thing => res.status(200).json(thing))
  .catch(error => res.status(404).json({error}));
  
});

//récupérer tous les items
app.get('/api/stuff', (req, res, next) => {
  //find est une méthode fournie par mongoose
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
  });

module.exports = app;
