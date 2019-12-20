import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import Tree from 'components/Tree';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

class MasterFncLoc extends Component {
  componentWillMount() {
    this.props.handleInitCategoryData();
  }

  render() {
    const {
      // data
      categoryData,
      selectedIndex,
      handleOnClick,
      updateTreeData,
    } = this.props;

    return <Tree type="app" treeData={categoryData} handleOnClick={handleOnClick} selectedIndex={selectedIndex} updateTreeData={updateTreeData} />;
  }
}

MasterFncLoc.propTypes = {
  categoryData: PropTypes.array,
  selectedIndex: PropTypes.number,
  handleOnClick: PropTypes.func.isRequired,
  handleInitCategoryData: PropTypes.func.isRequired,
  updateTreeData: PropTypes.func.isRequired,
};

MasterFncLoc.defaultProps = {
  categoryData: [],
  selectedIndex: -1,
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    handleInitCategoryData: () => dispatch(actions.initCategoryData()),
    updateTreeData: treeData => dispatch(actions.updateTreeData(treeData)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'masterFncloc', reducer });
const withSaga = injectSaga({ key: 'masterFncloc', saga });

export default injectIntl(compose(withReducer, withSaga, withConnect)(MasterFncLoc));
