import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

class DocPubMgr extends Component {
  render() {
    const { workSeq, apiArr, viewType } = this.props;
    return (
      <div style={{ backgroundColor: '#ffffff' }}>
        <BizBuilderBase id="DocPubMgr" workSeq={workSeq} component={List} viewType={viewType} apiArr={apiArr} />
      </div>
    );
  }
}

DocPubMgr.propTypes = {
  workSeq: PropTypes.number,
  apiArr: PropTypes.array,
  viewType: PropTypes.string,
};

DocPubMgr.defaultProps = {
  workSeq: 1059,
  viewType: 'LIST',
  apiArr: [
    {
      key: 'getDeptTree',
      url: '/api/common/v1/account/deptTree',
      type: 'GET',
      params: {},
    },
    {
      key: 'getInitPubData',
      url: '/api/mdcs/v1/common/DocPubMgr',
      type: 'GET',
      params: {},
    },
  ],
};

export default DocPubMgr;
