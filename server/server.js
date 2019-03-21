const express = require('express');
const app = express();
var io = require('socket.io')();
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 8082;

io.on('connection', (client) => {
  console.log('a user connected');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);

io.listen(PORT)
console.log(`Listening on port ${PORT}`)

// app.listen(PORT, () => {
//   console.log(`Listening on PORT: ${PORT}`);
// });
