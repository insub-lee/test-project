import React, { Component } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AutoSizer } from 'react-virtualized';
import { BackTop, Spin, Icon } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

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
  /* eslint-disable */
  render() {
    const { menuList, parentInfo, handleGoBack, isLoading } = this.props;

    console.debug('@@@@@ menuList, parentInfo', { menuList, parentInfo });
    console.debug('@@@@@ this.props', this.props);
    return (
      <StyleBizMenuList>
        <div className="bizCardListDiv">
          <BackTop />

          <AutoSizer>
            {({ width, height }) => (
              <ScrollBar style={{ width, height, overflow: 'hidden' }} autoHide autoHideTimeout={1000} autoHideDuration={200} className="tree-scrollbar">
                <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} spinning={isLoading}>
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
                </Spin>
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
  isLoading: PropTypes.bool,
};

BizMenuCardList.defaultProps = {
  menuList: [],
  parentInfo: {},
  isLoading: true,
};

const mapDispatchToProps = dispatch => ({
  handleInitPage: (ID, TYPE) => dispatch(actions.initPage(ID, TYPE)),
  handleGoBack: history => {
    // dispatch(actions.changeSearchWord(''));
    history.goBack();
  },
});

const mapStateToProps = createStructuredSelector({
  menuList: selectors.makeMenuList(),
  parentInfo: selectors.makeParentInfo(),
  isLoading: selectors.makeIsLoading(),
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
