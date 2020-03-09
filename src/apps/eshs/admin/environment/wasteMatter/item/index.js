import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class Item extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="item" component={List} />;
  }
}

Item.propTypes = {};
Item.defaultProps = {};

export default Item;
