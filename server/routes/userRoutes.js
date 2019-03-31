const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const db = require('../models/index');
const { User, UserBook, Location } = require('../models');
const errMsg =
  "The email or password you entered couldn't be verified. Please try again.";

router
  .route('/')
  .post((req, res) => {
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
        UserBook.findAll({
          where: { UserId: user.id }
        }).then(data => {
          if (data.length === 0) {
            res.json(user)
            }
          else {
            db.sequelize
              .query(
                `SELECT 
            Users.id, Users.firstName, Users.lastName, Books.BookId, Books.title, Books.author, Books.publisher, Books.publishedDate, Books.averageRating, Books.ratingsCount, Locations.latitude, Locations.longitude 
            FROM Users 
            INNER JOIN UserBooks ON UserBooks.UserId = Users.id 
            INNER JOIN Books ON UserBooks.BookId = Books.BookId 
            INNER JOIN Locations ON Locations.UserId = Users.id 
            WHERE Users.id = ${user.id}`,
                {
                  type: sequelize.QueryTypes.SELECT
                }
              )
              .then(data => {
                let userObj = {};
                data.map(item => {
                  Object.assign(userObj, item);
                });
                res.json(userObj);
              });
          }
        });
      }
    });
  })
  .delete((req, res) => {
    const { id } = req.body;
    console.log(req.body);
    Location.destroy({
      where: { userId: id }
    });
    res.send(`Location deleted for user: ${id}`);
  });

module.exports = router;
