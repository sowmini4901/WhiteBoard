const db = require("../models");
const us = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtConfig');


// Create 
exports.create = (req, res) => {

    // Validate request
    if (!req.body.email) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

       // Create a user
    const user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        id: req.body.id,
    };
  
    // Save 
    us.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };


  exports.login = (req, res) => {

    us.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(user => {
        if (req.body.password == false) {
          console.log('password required');
          res
            .status(400)
            .send({ auth: false, token: null, message: 'password required' });
        } else if (user === null) {
          console.log('bad username');
          res.status(400).json('bad username');
        } else {
          compare(req.body.password, user.password).then(response => {
            if (response === true) {
              const token = jwt.sign({ id: user.username }, jwtSecret.secret, {
                expiresIn: 86400,
              });
              console.log('user found & logged in');
              res
                .status(200)
                .send({ auth: true, token, message: 'user found & logged in' });
            } 
          });
        }
      });
   
  }
