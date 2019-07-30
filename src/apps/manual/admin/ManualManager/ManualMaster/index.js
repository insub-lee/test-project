import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import DefaultMgr from './DefaultMgr';
import MenuMenu from './ManualMenu';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import selectors from './selectors';
import EditorMgr from './EditorMgr';

class ManualMaster extends Component {
  componentDidMount() {
    const { SetMovePageTypeReducr, SetDefaultMgrChangeValueByReducd, match, manualIndex, categoryIndex } = this.props;
    if (match && match.params && match.params.selectedMualIdx) {
      const { selectedMualIdx, selectedCategoryIdx } = match.params;
      const defaultMovePageType = fromJS({
        pageType: 'DefaultMgr',
        selectedMualIdx,
        selectedCategoryIdx,
      });
      SetMovePageTypeReducr(defaultMovePageType);
    } else {
      const defaultMovePageType = fromJS({
        pageType: 'DefaultMgr',
        selectedMualIdx: manualIndex,
        selectedCategoryIdx: categoryIndex,
      });
      SetMovePageTypeReducr(defaultMovePageType);
    }
  }

  componentDidUpdate(prevProps) {
    const { SetMovePageTypeReducr, SetDefaultMgrChangeValueByReducd, match, manualIndex, categoryIndex } = this.props;
    if (match && match.params && match.params.selectedMualIdx) {
      const { selectedMualIdx, selectedCategoryIdx } = match.params;
      const defaultMovePageType = fromJS({
        pageType: 'DefaultMgr',
        selectedMualIdx,
        selectedCategoryIdx,
      });
      SetMovePageTypeReducr(defaultMovePageType);
    } else if (prevProps.manualIndex !== manualIndex || prevProps.categoryIndex !== categoryIndex) {
      const defaultMovePageType = fromJS({
        pageType: 'DefaultMgr',
        selectedMualIdx: manualIndex,
        selectedCategoryIdx: categoryIndex,
      });
      SetMovePageTypeReducr(defaultMovePageType);
    }
  }

  componentWillUnmount() {
    const { SetMovePageTypeReducr } = this.props;
    const defaultMovePageType = fromJS({
      pageType: 'DefaultMgr',
      selectedMualIdx: 0,
      selectedCategoryIdx: 0,
    });
    SetMovePageTypeReducr(defaultMovePageType);
  }

  render() {
    const { isEditorMgr } = this.props;
    return (
      <div>
        <MenuMenu />
        <DefaultMgr />
        {isEditorMgr && <EditorMgr />}
      </div>
    );
  }
}

ManualMaster.propTypes = {
  SetMovePageTypeReducr: PropTypes.func,
  isEditorMgr: PropTypes.bool,
  manualIndex: PropTypes.number,
  categoryIndex: PropTypes.number,
};

ManualMaster.defaultProps = {
  SetMovePageTypeReducr: () => false,
  isEditorMgr: false,
  manualIndex: 0,
  categoryIndex: 0,
};

const mapStateToProps = createStructuredSelector({
  isEditorMgr: selectors.makeSelectIsEditorMgr(),
});

const mapDispatchToProps = dispatch => ({
  SetMovePageTypeReducr: movePageType => dispatch(actions.setMovePageTypeReducr(movePageType)),
});

const withReducer = injectReducer({ key: 'apps-ManualMaster-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-ManualMaster-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManualMaster);
