const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const bookSearch = require('./bookSearch');
const PORT = process.env.PORT || 8082;
const googleBooksAPI = 'AIzaSyD4JhOYBIM94J6R6C-5IiC06XvBza-dDSM';

app.use(bodyParser.json());

app.get('/books', (req, res) => {
  const input = req.query.input,
    type = req.query.type;
  axios.get(bookSearch(input, type)).then(response => {
    const data = response.data.items.map(book => {
      const {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        imageLinks
      } = book.volumeInfo;

      return {
        id: book.id,
        volumeInfo: {
          title,
          authors,
          publisher,
          publishedDate,
          description,
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
