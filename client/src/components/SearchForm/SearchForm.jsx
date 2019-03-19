import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cancel from '../../assets/icons/x-circle.svg'

class SearchForm extends Component {
  render() {
    return (
      <Form.Group className="search-container">
        <Form.Control
          type="text"
          // size="lg"
          className="search"
          placeholder="Search by author or title"
          ref={self => (this.searchField = self)}
          onChange={() => this.props.findBooks(this.searchField.value)}
        />
        {/* <Button type="button" variant="outline-warning" size="sm" block>
          Cancel
        </Button> */}
        <img className='cancel' src={cancel} alt="cancel"/>
      </Form.Group>
    );
  }
}

export default SearchForm;
