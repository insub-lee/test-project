import React, { PureComponent } from 'react';
import { Row } from 'antd';
import noResultImage from 'images/bizstore/no-result.png';
import PropTypes from 'prop-types';
export default class noResult extends PureComponent {
  render() {
    const { searchWord } = this.props;
    return (
      <div>
        <Row style={{ textAlign: 'center' }}>
          <img src={noResultImage} alt="알림" />
        </Row>
        <Row style={{ textAlign: 'center' }}>
          {searchWord === '' ? (
            <span>결과가 없습니다.</span>
          ) : (
            <div>
              <span style={{ color: 'red' }}>`{searchWord}`</span>
              <span>에 대한 검색결과가 없습니다.</span>
            </div>
          )}
        </Row>
      </div>
    );
  }
}
noResult.propTypes = {
  searchWord: PropTypes.string,
};
