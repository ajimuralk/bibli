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
  .post((req, res) => {
    //First id below is UserId, not BookID
    let { id, book } = req.body,
      newBook = ({
        id,
        title,
        publisher,
        publishedDate,
        description,
        categories,
        averageRating,
        ratingsCount
      } = book);
    //Takes first author in array
    newBook.author = book.author[0];

    User.findOne({
      where: { id }
    }).then(user => {
      //Create both new book and UserBook instance?
      //Or is issue in the findAll?
      console.log(user);
      // Book.create({
      //   newBook
      // });

      // .then(user => {
      //   UserBook.create({
      //     BookId,
      //     id
      //   });
      // });
      console.log(user);
      res.send('Saved');
    });
  });

module.exports = router;
