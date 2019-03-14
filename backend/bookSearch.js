module.exports = bookSearch = (input, type) => {
  const searchInput = input.split(' ').join('+');
  let searchType = '';
  switch (type) {
    case 'author':
      searchType = 'inauthor';
      break;
    case 'subject':
      searchType = 'subject';
      break;
    default:
      searchType = 'intitle';
  }
  return `https://www.googleapis.com/books/v1/volumes?q=${searchType}=${searchInput}`;
};
