const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User, UserBook, Book } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const bookSearch = require('../bookSearch');

router
  .route('/')
  .get((req, res) => {
    const input = req.query.input;
    axios
      .get(bookSearch(input))
      .then(response => {
        const data = response.data.items
          .filter(book => {
            return book.volumeInfo.imageLinks.thumbnail !== undefined || '';
          })
          .map(book => {
            let {
              title,
              authors,
              publisher,
              publishedDate,
              description,
              imageLinks,
              categories,
              averageRating,
              ratingsCount
            } = book.volumeInfo;

            if (!imageLinks) {
              imageLinks = '';
            }

            return {
              id: book.id,
              title,
              author: authors,
              publisher,
              publishedDate,
              description,
              categories,
              averageRating,
              ratingsCount,
              image: `https${imageLinks.thumbnail.substr(4)}`
            };
          });
        res.json(data);
      })
  })
  .post((req, res) => {
    let {
        title,
        publisher,
        publishedDate,
        averageRating,
        ratingsCount
      } = req.body.book,
      BookId = req.body.book.id,
      author = req.body.book.author[0],
      id = req.body.UserId;

    User.findOne({
      where: { id }
    }).then(user => {
      Book.create({
        BookId: BookId,
        title,
        author,
        publisher,
        publishedDate,
        averageRating,
        ratingsCount
      })
        .then(book => UserBook.create({ UserId: user.id, BookId: BookId }))
        .catch(err => console.log(err));
      res.send('Saved');
    });
  });

module.exports = router;
