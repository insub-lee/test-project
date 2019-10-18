import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from './List';
import BizBuilderBase from '../../components/BizBuilderBase';

class DocTemplate extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <BizBuilderBase id="DocTemplate" component={List} viewType="LIST" {...this.props} />
      </div>
    );
  }
}

DocTemplate.propTypes = {
  workSeq: PropTypes.number,
  apiArr: PropTypes.array,
};

DocTemplate.defaultProps = {
  workSeq: 1011,
  apiArr: [
    {
      key: 'docCategoryTempListExtra',
      url: '/api/mdcs/v1/common/DocCategoryTemplHandler',
      type: 'GET',
      params: {},
    },
    {
      key: 'categoryMapInfoExtra',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=3',
      type: 'GET',
      params: {},
    },
    {
      key: 'docMapInfoExtra',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=2',
      type: 'GET',
      params: {},
    },
  ],
};

export default DocTemplate;
