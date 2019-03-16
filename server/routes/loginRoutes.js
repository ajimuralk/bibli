const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.route('/').post((req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email }
  }).then(user => {
    if (!user) {
      res.json({
        success: false,
        err:
          "The email or password you entered couldn't be verified. Please try again."
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            success: false,
            err:
              "The email or password you entered couldn't be verified. Please try again."
          });
        } else
          res.json({
            success: true,
            err: null
          });
      });
    }
  });
});

module.exports = router;
