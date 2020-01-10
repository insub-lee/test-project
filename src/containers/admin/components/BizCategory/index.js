import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as actionsApp from 'containers/admin/App/actions';
import Tree from '../Tree';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import StyledTabList from '../TabList/StyledTabList';

class BizCategory extends Component {
  componentWillMount() {
    this.props.handleInitCategoryData();
  }

  componentDidCatch(error, info) {
    // console.log(error);
    // console.log(info);
  }

  render() {
    const {
      // data
      categoryData,
      selectedIndex,

      preUrl,

      handleOnClick,
      resetSearchword,
      currentView,
    } = this.props;

    const showSearchBox = false;

    const isBizManage = preUrl.indexOf('bizManage') > -1;

    return (
      <StyledTabList className="treeWrapper">
        {currentView !== 'Mobile' && currentView !== 'Tablet' ? (
          <Tabs onSelect={() => {}} selectedIndex={1}>
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
        <Tree
          type="biz"
          treeData={categoryData}
          onClick={handleOnClick}
          showSearchBox={showSearchBox}
          selectedIndex={selectedIndex}
          generateNodeProps={({ node: node2 }) => {
            const node = node2;
            node.className = node.MENU_EXIST_YN === 'Y' ? 'bizIcon' : '';
          }}
        />
      </StyledTabList>
    );
  }
}

BizCategory.propTypes = {
  categoryData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  handleInitCategoryData: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

BizCategory.defaultProps = {
  categoryData: [],
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    handleInitCategoryData: () => dispatch(actions.initCategoryData()),
    resetSearchword: () => dispatch(actionsApp.changeSearchword('')),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
  selectedIndex: selectors.makeSelectedIndex(),
  currentView: selectors.currentView(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizcategory', reducer });
const withSaga = injectSaga({ key: 'bizcategory', saga });

export default injectIntl(compose(withReducer, withSaga, withConnect)(BizCategory));
