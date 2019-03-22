const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.send('Please login to access this data');
    return;
  }
  token = token.split(' ')[1]
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).send('Unable to access private data');
    } else next();
  });
};