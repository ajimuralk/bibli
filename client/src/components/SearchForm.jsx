import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search by author, title, or subject"
            ref={self => (this.searchField = self)}
            onChange={() => this.props.findBooks(this.searchField.value)}
          />
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
