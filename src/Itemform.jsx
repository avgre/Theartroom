import React, { Component } from 'react';

class Itemform extends Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      image: null,
      itemPrice: '',
    };
  }
  handleImageChange = (event) => {
    this.setState({ itemImage: event.target.files[0] });
  };
  handleNameChange = (evt) => {
    this.setState({ itemName: evt.target.value });
  };
  handlePriceChange = (evt) => {
    this.setState({ itemPrice: evt.target.value });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('itemName', this.state.itemName);
    formData.append('itemPrice', this.state.itemPrice);
    formData.append('img', this.state.itemImage);
    fetch('/add-item', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Item Name:</h1>
        <input
          type="text"
          onChange={this.handleNameChange}
          value={this.state.itemName}
        />
        <h1>Cost:</h1>
        <input
          type="text"
          onChange={this.handlePriceChange}
          value={this.state.itemPrice}
        />
        <h1>Image:</h1>
        <input onChange={this.handleImageChange} type="file" />
        <input type="submit" />
      </form>
    );
  }
}

export default Itemform;
