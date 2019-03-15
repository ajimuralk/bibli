const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const bookSearch = require('./bookSearch');
const bookRoutes = require('./routes/bookRoutes');
const PORT = process.env.PORT || 8082;
// const googleBooksAPI = 'AIzaSyD4JhOYBIM94J6R6C-5IiC06XvBza-dDSM';

app.use(bodyParser.json());
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
