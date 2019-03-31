const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/location', locationRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
