import React, { Component } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { AutoSizer } from 'react-virtualized';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as actionsLoading from 'containers/common/Loading/actions';

import { BackTop } from 'antd';

import StyleBizMenuList from './StyleBizMenuList';
import ItemList from './ItemList';

class BizMenuCardList extends Component {
  componentDidMount() {
    const {
      match: {
        params: { ID, TYPE },
      },
      handleInitPage,
    } = this.props;
    handleInitPage(ID, TYPE);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
      match: {
        params: { ID, TYPE },
      },
      handleInitPage,
    } = this.props;
    const {
      location: { pathname: prevPathname },
    } = prevProps;
    if (pathname !== prevPathname) {
      handleInitPage(ID, TYPE);
    }
  }

  render() {
    const { menuList, parentInfo, handleGoBack } = this.props;

    console.debug('@@@@@ menuList, parentInfo', { menuList, parentInfo });
    return (
      <StyleBizMenuList>
        <div className="bizCardListDiv">
          <BackTop />
          <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }} />
          <AutoSizer>
            {({ width, height }) => (
              <ScrollBar style={{ width, height, overflow: 'hidden' }} autoHide autoHideTimeout={1000} autoHideDuration={200} className="tree-scrollbar">
                <ItemList
                  type="ONE"
                  parentInfo={parentInfo}
                  mapList={menuList}
                  searchword={() => {}}
                  getMapListOne={() => {}}
                  getMapListMore={() => {}}
                  registerBiz={() => {}}
                  goBack={handleGoBack}
                />
              </ScrollBar>
            )}
          </AutoSizer>
        </div>
      </StyleBizMenuList>
    );
  }
}

BizMenuCardList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  handleInitPage: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  menuList: PropTypes.array,
  parentInfo: PropTypes.object,
};

BizMenuCardList.defaultProps = {
  menuList: [],
  parentInfo: {},
};

const mapDispatchToProps = dispatch => ({
  loadingOn: () => dispatch(actionsLoading.loadingOn()),
  handleInitPage: (ID, TYPE) => dispatch(actions.initPage(ID, TYPE)),
  handleGoBack: history => {
    // dispatch(actions.changeSearchWord(''));
    history.goBack();
  },
});

const mapStateToProps = createStructuredSelector({
  menuList: selectors.makeMenuList(),
  parentInfo: selectors.makeParentInfo(),
});

const withReducer = injectReducer({ key: 'menu-cardList', reducer });
const withSaga = injectSaga({ key: 'menu-cardList', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BizMenuCardList);
