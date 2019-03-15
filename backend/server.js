const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const bookSearch = require('./bookSearch');
const PORT = process.env.PORT || 8082;
// const googleBooksAPI = 'AIzaSyD4JhOYBIM94J6R6C-5IiC06XvBza-dDSM';

app.use(bodyParser.json());

app.get('/books', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
