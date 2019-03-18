const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const PORT = process.env.PORT || 8082;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/books', bookRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
