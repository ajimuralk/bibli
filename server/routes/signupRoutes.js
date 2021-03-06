const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const saltRounds = 10;

router.route('/').post((req, res) => {
  const { firstName, lastName, email, password } = req.body;
  User.findOne({
    where: { email }
  }).then(user => {
    if (user)
      res.json({
        success: false,
        err: `${email} is already in use.`
      });
    else
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) console.log(err);
        else {
          User.create({
            firstName,
            lastName,
            email,
            password: hash
          }).then(response => {
            res.json({
              success: true,
              err: null
            });
          });
        }
      });
  });
});

module.exports = router;
