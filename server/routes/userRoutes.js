const express = require('express');
const router = express.Router();
const { User } = require('../models');
const errMsg =
  "The email or password you entered couldn't be verified. Please try again.";

router.route('/').post((req, res) => {
  const { id } = req.body;
  User.findOne({
    where: { id }
  }).then(user => {
    if (!user) {
      res.json({
        success: false,
        err: errMsg
      });
    } else {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
  });
});

module.exports = router;
