const express = require('express');
const router = express.Router();
const { Location } = require('../models');
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
      res.json({ users });
    });
  })

  .post((req, res) => {
    const { latitude, longitude, UserId } = req.body;
    Location.findOrCreate({ where: { id: UserId } }).spread(
      (result, shouldCreateInstance) => {
        if (shouldCreateInstance) {
          Location.create({
            latitude,
            longitude,
            UserId
          });
          res.json(result);
        } else {
          Location.update({ latitude, longitude }, { where: { UserId } })
            .then(locationResult => {
              res.json({
                update: `true`
              });
            })
            .catch(err => console.log(err));
        }
      }
    );
  });

module.exports = router;
