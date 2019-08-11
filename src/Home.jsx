import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

class Home extends Component {
  render() {
    return (
      <div>
        Homepage!
        <button>
          <Link to={'/additem'}>Add an Item</Link>
        </button>
      </div>
    );
  }
}

export default Home;
