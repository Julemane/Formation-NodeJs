const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


//connexion à la DB mongoDB à l'aide de mongoose
const app = express();
mongoose.connect('mongodb+srv://'+process.env.MONGODB_USER+':'+process.env.MONGODB_KEY+'@nodeformation.ahmq2ht.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//setting des headers pour supprimer les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
//toutes les routes relative à ces endpoint sont definis dans le dossier "routes"
app.use('/api/stuff',stuffRoutes);
app.use('/api/auth',userRoutes);


module.exports = app;
