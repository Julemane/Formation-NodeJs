const User = require('../Models/user');
//bcrypt est un package permettant de hash le password
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password,10)
//on save le user avec le password hash dans la BDD
.then(hash=>{
    const user = new User({
        email : req.body.email,
        password : hash
    });
    user.save()
    .then(()=>res.status(201).json({message:'utilisateur créé'}))
    .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error}));
};

exports.login = (req, res, next) => {
User.findOne({email:req.body.email})
.then(user => {
    if (user === null){
        req.status(401).json({message :'Couple user password invalide'});
    }
    else{
        bcrypt.compare(req.body.password,user.password)
        .then(valid =>{
            if(!valid){
                req.res.status(401).json({message : 'Couple user password invalide'});
            }
            else{
                req.res.status(201).json({
                    userId: user._id,
                    Token : 'Token'
                })
            }
        })
        .catch(req.res.status(500).json({ error }));
    }
})
.catch(req.res.status(500).json({ error }));
};