const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    const input = req.query.input;
    axios.get(bookSearch(input)).then(response => {
      const data = response.data.items.map(book => {
        const {
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
            authors,
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
