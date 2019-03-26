import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import cancel from '../../assets/icons/x-circle.svg'

class SearchForm extends Component {


  render() {
    return (
      <Form.Group className="search-container">
        <Form.Control
          type="text"
          className="search"
          placeholder="Search by author or title"
          ref={self => (this.searchField = self)}
          onKeyDown={() => this.props.findBooks(this.searchField.value)}
        />
        <img className='cancel' src={cancel} onClick={() => this.props.cancelSearch(this.searchField)} alt="cancel"/>
      </Form.Group>
    );
  }
}

export default SearchForm;
