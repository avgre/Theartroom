import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <img height="100px" src={this.props.item.img} />
        <div>
          <div>{this.props.item.name}</div>
          <div>{this.props.item.cost}</div>
        </div>
      </div>
    );
  }
}

export default Item;
