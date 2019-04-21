import React, { Component } from 'react';
import iconError from '../images/icon_error.png';

export default class StateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <span
          role="presentation"
        >
          <center><img src={iconError} alt="" style={{ cursor: 'pointer' }} /></center>
        </span>
      </div>
    );
  }
}

StateBar.propTypes = {};
