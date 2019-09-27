import React, { Component } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';

import noResultImage from 'images/bizstore/no-result.png';

class noResult extends Component {
  componentDidMount() {}

  render() {
    const { keyword, treeData } = this.props;
    return (
      <div>
        <Row style={{ textAlign: 'center' }}>
          <img src={noResultImage} alt="알림" />
        </Row>
        <Row style={{ textAlign: 'center' }}>
          {treeData.length === 0 ? (
            <span>카테고리를 선택해 주세요.</span>
          ) : (
            <div>
              <span style={{ color: 'red' }}>`{keyword}`</span>
              <span>에 대한 검색결과가 없습니다.</span>
            </div>
          )}
        </Row>
      </div>
    );
  }
}
noResult.propTypes = {
  keyword: PropTypes.string,
  treeData: PropTypes.array,
};

noResult.defaultProps = {
  treeData: [],
};

export default noResult;
