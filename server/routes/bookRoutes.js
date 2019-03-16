const express = require('express');
const router = express.Router();
const axios = require('axios');
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
          volumeInfo: {
            title,
            author: authors,
            publisher,
            publishedDate,
            description,
            categories,
            averageRating,
            ratingsCount
          },
          image: imageLinks.thumbnail
        };
      });
      res.json(data);
    });
  })
  .post(isLoggedIn, (req, res) => {
    console.log(req.body)
    //find user
    //perform validation--or does isLoggedIn do this?
    //add book to db
    res.send('Saved');
  });

module.exports = router;
