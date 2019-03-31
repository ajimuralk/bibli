const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.json({ err: 'Unable to access private data'})
    return;
  }
  token = token.split(' ')[1]
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err: 'Unable to access private data'});
    } else next();
  });
};