import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as actionsApp from 'containers/store/App/actions';
import Tree from 'components/Tree';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import StyledTabList from '../TabList/StyledTabList';

class AppCategory extends Component {
  componentWillMount() {
    this.props.handleInitCategoryData();
  }
  /* eslint-disable */
  render() {
    const {
      // data
      categoryData,
      selectedIndex,
      preUrl,
      showTabs,
      handleOnClick,
      updateTreeData,
      resetSearchword,
      currentView,
    } = this.props;
    const isBizManage = preUrl.indexOf('bizManage') > -1;

    const preUrlSplitArr = preUrl.split('/');
    const preUrlLast = preUrlSplitArr[preUrlSplitArr.length - 1];
    const appStyleModify = preUrlLast !== 'bizStore' ? `0px` : '134px';

    return (
      <StyledTabList className="treeWrapper" style={{ left: appStyleModify }}>
        {showTabs && (currentView !== 'Mobile' && currentView !== 'Tablet') ? (
          <Tabs onSelect={() => {}} selectedIndex={0}>
            <TabList>
              <Tab>
                <Link to={`${preUrl}/app/list`} onClick={resetSearchword}>
                  <FormattedMessage {...messages.category} />
                </Link>
              </Tab>
              {!isBizManage ? (
                <Tab>
                  <Link to={`${preUrl}/biz/list`} onClick={resetSearchword}>
                    <FormattedMessage {...messages.bizGroup} />
                  </Link>
                </Tab>
              ) : (
                ''
              )}
            </TabList>
            <TabPanel />
            <TabPanel />
          </Tabs>
        ) : (
          ''
        )}
        <Tree type="app" treeData={categoryData} handleOnClick={handleOnClick} selectedIndex={selectedIndex} updateTreeData={updateTreeData} />
      </StyledTabList>
    );
  }
}

AppCategory.propTypes = {
  categoryData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  currentView: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  handleInitCategoryData: PropTypes.func.isRequired,
  updateTreeData: PropTypes.func.isRequired,
};

AppCategory.defaultProps = {
  categoryData: [],
  showTabs: true,
  selectedIndex: -1,
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    handleInitCategoryData: () => dispatch(actions.initCategoryData()),
    resetSearchword: () => dispatch(actionsApp.changeSearchword('')),
    updateTreeData: treeData => dispatch(actions.updateTreeData(treeData)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
  currentView: selectors.currentView(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'appcategory', reducer });
const withSaga = injectSaga({ key: 'appcategory', saga });

export default injectIntl(
  compose(
    withReducer,
    withConnect,
    withSaga,
  )(AppCategory),
);
