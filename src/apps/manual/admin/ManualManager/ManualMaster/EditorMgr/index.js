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
    const { handleChangeCompIdx } = this.props;
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
            <div id="manualMainContentWrapper" className="manualMainContentWrapper" onClick={handleChangeCompIdx}>
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
  handleChangeCompIdx: PropTypes.func,
};

EditorMgr.defaultProps = {
  getManualEditorMgr: () => false,
  resetManualEditorMgr: () => false,
  handleChangeCompIdx: () => false,
};

const mapDispatchToProps = dispatch => ({
  getManualEditorMgr: () => dispatch(actions.getManualEditorMgrBySaga()),
  resetManualEditorMgr: () => dispatch(actions.resetEditorMgrByReduc()),
  handleChangeCompIdx: () => dispatch(actions.setEditorComponentIndexByReduc(0)),
});

export default connect(
  null,
  mapDispatchToProps,
)(EditorMgr);
