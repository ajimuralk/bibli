const express = require('express');
const router = express.Router();
const { User, Book, UserBook, Location } = require('../models');
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
      let userId = user.id;
      UserBook.findAll({
        where: { userId }
      }).then(books => {
        Location.findOne({
          where: { userId }
        }).then(coords => {
          res.json({ user, books, coords });
        });
      });
    }
  });
});

module.exports = router;
