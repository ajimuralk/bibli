const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User, UserBook } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const bookSearch = require('../bookSearch');

router
  .route('/')
  .get((req, res) => {
    const input = req.query.input;
    axios.get(bookSearch(input)).then(response => {
      const data = response.data.items.map(book => {
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
          image: imageLinks.thumbnail
        };
      });
      res.json(data);
    });
  })
  .post(isLoggedIn, (req, res) => {
    const {id, BookId} = req.body

    User.findOne({
      where: { id }
    })
    .then(user => {
      UserBook.create({
        UserId: id,
        BookId
      })
      console.log(user)
      res.send('Saved');
    })
  });

module.exports = router;
