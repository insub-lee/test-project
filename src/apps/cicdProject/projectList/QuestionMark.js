import React, { Component } from 'react';
import iconDetail from '../images/icon_detail.png';

export default class QuestionMark extends Component {
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
          <center><img src={iconDetail} alt="" style={{ cursor: 'pointer' }} /></center>
        </span>
      </div>
    );
  }
}

QuestionMark.propTypes = {};
