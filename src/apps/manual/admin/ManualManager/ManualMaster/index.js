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
import OptionMgr from './OptionMgr';
import CompareMgr from './CompareMgr';

class ManualMaster extends Component {
  componentDidMount() {
    const { SetMovePageTypeReducr, match, manualIndex, categoryIndex } = this.props;
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
    const { SetMovePageTypeReducr, match, manualIndex, categoryIndex } = this.props;
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
    const { isEditorMgr, pageMoveType } = this.props;
    let viewContents = <DefaultMgr />;
    switch (pageMoveType.get('pageType')) {
      case 'OptionMgr':
        viewContents = <OptionMgr />;
        break;
      case 'Compare':
        viewContents = <CompareMgr />;
        break;
      default:
        break;
    }
    return (
      <div>
        <MenuMenu />
        {viewContents}
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
  pageMoveType: PropTypes.object,
};

ManualMaster.defaultProps = {
  SetMovePageTypeReducr: () => false,
  isEditorMgr: false,
  manualIndex: 0,
  categoryIndex: 0,
  pageMoveType: fromJS({}),
};

const mapStateToProps = createStructuredSelector({
  isEditorMgr: selectors.makeSelectIsEditorMgr(),
  pageMoveType: selectors.makeSelectMovePageType(),
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
