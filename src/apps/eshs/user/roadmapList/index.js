import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

import List from './List';

class roadmapList extends Component {
  render() {
    return <BizBuilderBase workSeq={2041} CustomListPage={List} />;
  }
}

roadmapList.propTypes = {};

export default roadmapList;
