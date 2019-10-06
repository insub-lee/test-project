import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import ManualManager from '../ManualManager';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import StyleCategoryManage from './StyleCategoryManage';
import Tree from './Tree';
import CategoryInfo from './CategoryInfo';
import WaitManualList from './WaitManualList';
import StyledButton from '../../../../components/Button/StyledButton';

class CategoryManage extends Component {
  componentDidMount() {
    const { getCategoryTreeData } = this.props;
    getCategoryTreeData();
  }

  render() {
    const { mode, setIsWaitModal, isWaitModal } = this.props;
    let contentComp = '';
    switch (mode) {
      case 'I':
      case 'U':
        contentComp = <CategoryInfo />;
        break;
      case 'V':
        contentComp = <ManualManager />;
        break;
      case 'L':
        contentComp = <ManualManager />;
        break;
      default:
        break;
    }

    return (
      <StyleCategoryManage>
        <ErrorBoundary>
          <div className="categoryWrapper">
            <div className="categoryTitleWrapper">
              <h3 className="pageTitle list">카테고리 관리</h3>
              <StyledButton className="btn-sm btn-bs-none btn-outline-danger" onClick={() => setIsWaitModal(true)}>
                미확정 리스트 보기
              </StyledButton>
            </div>
            <div className="categoryManageWrapper">
              <div className="categoryTreeWrapper">
                <Tree />
              </div>
              <div className="categoryContentWrapper">{contentComp}</div>
              {/* {(mode === 'I' || mode === 'U') && }
              {!(mode === 'I' || mode === 'U') && (
                <div className="categoryContentWrapper">
                  <Route path={`${match.url}/ManualMaster/:categoryIdx/:selectedMualIdx`} component={ManualMaster} />
                  <Route path={`${match.url}/ManualList/:categoryIdx`} component={ManualList} />
                </div>
              )} */}
            </div>
          </div>
          <Modal
            width={800}
            bodyStyle={{ padding: '49px 8px 10px 8px' }}
            visible={isWaitModal}
            footer={null}
            onCancel={() => setIsWaitModal(false)}
            destroyOnClose
          >
            <WaitManualList />
          </Modal>
        </ErrorBoundary>
      </StyleCategoryManage>
    );
  }
}

CategoryManage.propTypes = {
  getCategoryTreeData: PropTypes.func,
  setIsWaitModal: PropTypes.func,
  mode: PropTypes.string,
  isWaitModal: PropTypes.bool,
};

CategoryManage.defaultProps = {
  getCategoryTreeData: () => false,
  setIsWaitModal: () => false,
  mode: '',
  isWaitModal: false,
};

const mapStateToProps = createStructuredSelector({
  mode: selectors.makeSelectMode(),
  isWaitModal: selectors.makeSelectIsWaitModal(),
});

const mapDispatchToProps = dispatch => ({
  getCategoryTreeData: () => dispatch(actions.getCategoryTreeData()),
  setIsWaitModal: flag => dispatch(actions.setIsWaitModalByReducr(flag)),
});

const withReducer = injectReducer({ key: 'apps-CategoryManage-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-CategoryManage-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(CategoryManage);
