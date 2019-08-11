import React, { Component } from 'react';
import './main.css';
import { connect } from 'react-redux';
import Item from './Item.jsx';
class Market extends Component {
  async componentDidMount() {
    let response = await fetch('/api/items', {
      method: 'GET',
    });
    let json = await response.json();
    this.props.dispatch({
      type: 'SET_ITEMS',
      payload: json.items,
    });
  }
  render() {
    return (
      <div>
        {this.props.items.map((item) => (
          <Item item={item} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { items: state.items };
};

export default connect(mapStateToProps)(Market);
