module.exports = bookSearch = (type, input) => {
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
  return `https://www.googleapis.com/books/v1/volumes?q=${searchType}=${searchInput}&maxResults=40&orderBy=relevance`;
};
