module.exports = bookSearch = input => {
  const searchInput = input.split(' ').join('+');
  return `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=10&langRestrict=en&orderBy=relevance`;
};
