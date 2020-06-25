import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Input } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import Styled from './Styled';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

const AntdInput = StyledInput(Input);

class FileManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  componentDidMount() {
    this.props.getSiteList();
  }

  render() {
    const { siteList } = this.props;
    return (
      <Styled>
        <div className="section-wrapper">
          <div className="right-section">
            <div className="title-area">[타이틀이라네요..]</div>
            <div className="menu-area">
              <div className="menu-item">메뉴1</div>
              <div className="menu-item">메뉴2</div>
              <div className="menu-item">메뉴3</div>
            </div>
          </div>
          <div className="left-section">
            <div className="search-area">
              <AntdInput style={{ width: 200 }} className="ant-input-sm ant-input-inline mr5" placeholder="검색어를 입력해 주세요."></AntdInput>
              <StyledButton className="btn-gray btn-sm">검색</StyledButton>
            </div>
          </div>
        </div>
      </Styled>
    );
  }
}

FileManage.propTypes = {
  getSiteList: PropTypes.func.isRequired,
  siteList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSiteList: () => dispatch(actions.getSiteList()),
});
const mapStateToProps = createStructuredSelector({
  siteList: selectors.makeSelectSiteList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'filemanage', reducer });
const withSaga = injectSaga({ key: 'filemanage', saga });

export default compose(withReducer, withSaga, withConnect)(FileManage);
