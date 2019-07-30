import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';

import StyleModal from './StyleModal';
import EditorToolBar from './EditorToolBar';
import EditorMenu from './EditorMenu';
import EditorTab from './EditorTab';
import EditorMain from './EditorMain';
import EditorIndex from './EditorIndex';

class EditorMgr extends Component {
  componentDidMount() {
    const { getManualEditorMgr } = this.props;
    getManualEditorMgr();
  }

  componentWillUnmount() {
    const { resetManualEditorMgr } = this.props;
    resetManualEditorMgr();
  }

  render() {
    return (
      <StyleModal className="modalWrapper inPage">
        <div>
          <EditorMenu />
          <EditorToolBar />
          <div className="manualContentWrapper">
            <div className="manualMainMenuWrapper">
              <EditorTab />
            </div>
            <div className="manualMainIndexWrapper">
              <EditorIndex />
            </div>
            <div className="manualMainContentWrapper">
              <EditorMain />
            </div>
          </div>
        </div>
      </StyleModal>
    );
  }
}

EditorMgr.propTypes = {
  getManualEditorMgr: PropTypes.func,
  resetManualEditorMgr: PropTypes.func,
};

EditorMgr.defaultProps = {
  getManualEditorMgr: () => false,
  resetManualEditorMgr: () => false,
};

const mapDispatchToProps = dispatch => ({
  getManualEditorMgr: () => dispatch(actions.getManualEditorMgrBySaga()),
  resetManualEditorMgr: () => dispatch(actions.resetEditorMgrByReduc()),
});

export default connect(
  null,
  mapDispatchToProps,
)(EditorMgr);
