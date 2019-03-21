const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const bookRoutes = require('./routes/bookRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});





// const http = require('http');
// const server = http.createServer(app);
// const io = require('socket.io')(server);

// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(
//       "https://api.darksky.net/forecast/875b76a1981f5533dd5aff2060f964c1/43.7695,11.2558"
//     );
//     socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };

// let interval;

// io.on('connection', socket => {
//   console.log('New client connected');
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 5000);
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });


// server.listen(PORT);
// console.log(`Listening on port ${PORT}`);

