const express = require('express');
const router = express.Router();
const { Location } = require('../models');
const sequelize = require('sequelize');
const db = require('../models/index');

router
  .route('/')
  .get((req, res) => {
    const user = req.query.input;
    db.sequelize
      .query(
        `SELECT 
      Books.title, Books.author, Books.publisher, Books.publishedDate, Books.averageRating, Books.ratingsCount, Users.firstName, Users.lastName, Users.id, Locations.latitude,Locations.longitude 
      FROM Books 
      INNER JOIN UserBooks ON Books.BookId = UserBooks.BookId 
      INNER JOIN Users ON UserBooks.UserId = Users.id 
      INNER JOIN Locations ON Locations.UserId = Users.id`,
        {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(results => {
        //Creates an array of all users, then filters our the currently signed in user, whose id is provided in the above request query input
        let nearbyUsers = results.filter(singleUser => {
          return singleUser['id'] !== Number(user);
        });

        res.json(nearbyUsers);
      });
  })
  .post((req, res) => {
    const { latitude, longitude, UserId } = req.body;
    /* findOrCreate requires .spread rather than .then to /access the method's contents */
    Location.findOrCreate({ where: { UserId } }).spread(
      (result, shouldCreateInstance) => {
        if (shouldCreateInstance) {
          Location.create({
            latitude,
            longitude,
            UserId
          });
          res.json(result);
          return;
        } else if (Object.is(result._previousDataValues, result.dataValues)) {
          return;
        } else
          Location.update({ latitude, longitude }, { where: { UserId } })
            .then(locationResult => {
              console.log(`Coords updated`);
              res.json({
                update: `true`
              });
            })
            .catch(err => console.log(err));
      }
    );
  });

module.exports = router;
