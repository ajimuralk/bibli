import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class SearchForm extends Component {
  render() {
    return (
      <div>
        <form>
          <Form.Group>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Search by author or title"
            ref={self => (this.searchField = self)}
            onChange={() => this.props.findBooks(this.searchField.value)}
          />
          <Button type="button" variant="outline-warning" size="sm" block>Cancel</Button>
          </Form.Group>
        </form>
      </div>
    );
  }
}

export default SearchForm;
