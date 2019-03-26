const express = require('express');
const router = express.Router();
const { Location, Book, UserBook, User } = require('../models');
const sequelize = require('sequelize');

router
  .route('/')
  .get((req, res) => {
    const user = req.query.input;
    let usersArr = [];

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
        res.json(users);
        // User.findAll({
        //   where: { UserId: users[0].id },
        //   include: [
        //     {
        //       model: Book,
        //       through: {
        //         attributes: [
        //           ['Book.title'],
        //           ['Book.author'],
        //           ['User.firstName'],
        //           ['User.lastName'],
        //           ['User.id']
        //         ]
        //       }
        //     }
        //     ,{
        //       model: Book,
        //       attributes: [
        //         ['Book.title'],
        //         ['Book.author'],
        //         ['User.firstName'],
        //         ['User.lastName'],
        //         ['User.id']
        //       ]
        //     }
        //   ]
        // }).then(data => {
        //   res.json(data);
        // });

        // sequelize
        //   .query(
        //     'SELECT Book.title, Book.author, User.firstName, User.lastName, User.id FROM Book INNER JOIN UserBook ON Book.BookId = UserBook.BookId INNER JOIN Users ON UserBook.UserId = User.id',
        //     { type: sequelize.QueryTypes.SELECT }
        //   )
        //   .then(([results, metadata]) => {
        //     res.json(results)
        //   });

        // Book.findAll({
        //   include: [
        //     { model: UserBook, required: true, where: { UserId: user.id } }
        //   ],
        //   incldue: [
        //     { model: User, required: true, where: { UserId: user.id } }
        //   ],
        //   attributes: [
        //     ['Book.title'],
        //     ['Book.author'],
        //     ['User.firstName'],
        //     ['User.lastName'],
        //     ['User.id']
        //   ]
        // }).then(data => {
        //   return data;
        // });

        // Book.findAll({
        //   include: [{
        //     model: User,
        //     through: {
        //       model: UserBook,
        //       attributes: ['UserId'],
        //       where: {UserId: users.UsersId}
        //     }
        //   }]
        // }).then(data => {
        //   res.json(data)
        // })

        // let u = {
        //   user: [],
        //   userBookIds: [],
        //   books: []
        // };

        // u.user = users;

        // users.map(user => {
        //   UserBook.findAll({
        //     where: { UserId: user.UserId }
        //   }).then(data => {
        //     u.userBookIds = data;

        //     data.map(book => {
        //       Book.findAll({
        //         where: { BookId: book.BookId }
        //       }).then(bookData => {
        //         u.books = bookData;
        //       });
        //     });
        //   });
        //   usersArr.push(u);
        // });
        // res.json(usersArr);
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
