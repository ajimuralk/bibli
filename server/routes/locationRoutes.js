const express = require('express');
const router = express.Router();
const { Location, Book, UserBook, User } = require('../models');
const sequelize = require('sequelize');

router
  .route('/')
  .get((req, res) => {
    const user = req.query.input;
    Location.findAll({
      where: {
        UserId: {
          [sequelize.Op.not]: user
        }
      }
    }).then(users => {
      if (!users) {
        res.send('No nearby users');
      } else {
        let dataObj = {}

        // users.map(user => {
        //   UserBook.findAll({
        //     where: {UserId: user.UserId}
        //   }).then(data => {
        //     res.json(ata);
        //   })
        // })
        res.json(users)

      }
    });
  })
  .post((req, res) => {
    const { latitude, longitude, UserId } = req.body;

    Location.findOrCreate({ where: { UserId } }).spread(
      (result, shouldCreateInstance) => {
        if (shouldCreateInstance) {
          Location.create({
            latitude,
            longitude,
            UserId
          });
          res.json(result);
        }
        if (result._previousDataValues === result.dataValues) return;
        Location.update({ latitude, longitude }, { where: { UserId } })
          .then(locationResult => {
            res.json({
              update: `true`
            });
          })
          .catch(err => console.log(err));
      }
    );
  });

module.exports = router;
