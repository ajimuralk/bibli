const express = require('express');
const router = express.Router();
const { Location, Book, UserBook, User } = require('../models');
const sequelize = require('sequelize');
const db = require('../models/index');

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
        res.json({ errMsg: 'No nearby users' });
      } else {
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
            let userObj = {};
            results.map(user => {
              Object.assign(userObj, user);
            });
            res.json([userObj]);
          });
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
        if (Object.is(result._previousDataValues, result.dataValues)) return;
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
