const express = require('express');
const router = express.Router();
const { Location } = require('../models');

router.route('/').post((req, res) => {
  const { latitude, longitude, UserId } = req.body;
  Location.findOrCreate({ where: { id: UserId } }).spread((result, newInstanceCreated) => {
    if (newInstanceCreated) {
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
  });
});

module.exports = router;
