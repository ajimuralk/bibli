const express = require('express');
const router = express.Router();
const axios = require('axios');
const bookSearch = require('../bookSearch');

router
  .route('/')
  .get((req, res) => {
    const input = req.query.input;
    axios.get(bookSearch(input)).then(response => {
      const data = response.data.items.map(book => {
        let {
          title,
          author,
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
            author,
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
  });

module.exports = router;
