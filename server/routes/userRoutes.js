const express = require('express');
const router = express.Router();
const { User, Book, UserBook } = require('../models');
const errMsg =
  "The email or password you entered couldn't be verified. Please try again.";

router.route('/').post((req, res) => {
  const { id } = req.body;
  User.findAll({
    where: {
      id
    },
    include: [{
      model: Book,
      through: {
        attributes: ['UserId']
      }
    }]
  }).then(user => {
    console.log(user);
    if (!user) {
      res.json({
        success: false,
        err: errMsg
      });
    } else {
      res.json({
        user
        // firstName: user.firstName,
        // lastName: user.lastName
      });
    }
  });
});

module.exports = router;
