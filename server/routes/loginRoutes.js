const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isLoggedIn = require('../middleware/isLoggedIn');
const { User } = require('../models');
const errMsg =
  "The email or password you entered couldn't be verified. Please try again.";

router.route('/').post((req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email }
  }).then(user => {
    if (!user) {
      res.json({
        success: false,
        err: errMsg
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            success: false,
            err: errMsg
          });
        }
        let token = jwt.sign(
          {
            email: user.email,
            iss: `localhost:${process.env.PORT}`,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            role: 'user'
          },
          process.env.jwtSecret
        );
        res.json({
          success: true,
          token,
          err: null,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id
          }
        });
      });
    }
  });
});

module.exports = router;
