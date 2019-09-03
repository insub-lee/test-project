import React, { Component } from 'react';
import { Modal } from 'antd';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import selectors from '../selectors';

import StyleModal from './StyleModal';
import EditorToolBar from './EditorToolBar';
import EditorMenu from './EditorMenu';
import EditorTab from './EditorTab';
import EditorMain from './EditorMain';
import EditorIndex from './EditorIndex';
import IndexRelation from './IndexRelation';

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
    const {
      handleChangeCompIdx,
      isIndexRelationModal,
      setIsIndexRelationModal,
      treeData,
      getMualList,
      manualList,
      getCompList,
      compList,
      setSelectedCompItem,
      addEditorComponent,
      selectedCompItem,
      indexRelationList,
    } = this.props;
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
        <Modal
          width={854}
          bodyStyle={{ height: 'calc(100vh - 196px)', padding: '4px' }}
          style={{ top: 42 }}
          visible={isIndexRelationModal}
          footer={null}
          onCancel={setIsIndexRelationModal}
          getContainer={() => document.querySelector('#manualMainContentWrapper')}
          title="관련 목차 선택"
        >
          <IndexRelation
            treeData={treeData}
            getMualList={getMualList}
            manualList={manualList}
            getCompList={getCompList}
            compList={compList}
            setSelectedCompItem={setSelectedCompItem}
            addEditorComponent={addEditorComponent}
            selectedCompItem={selectedCompItem}
          />
        </Modal>
      </StyleModal>
    );
  }
}

EditorMgr.propTypes = {
  getManualEditorMgr: PropTypes.func,
  resetManualEditorMgr: PropTypes.func,
  handleChangeCompIdx: PropTypes.func,
  isIndexRelationModal: PropTypes.bool,
  setIsIndexRelationModal: PropTypes.func,
  treeData: PropTypes.object,
  getMualList: PropTypes.func,
  getCompList: PropTypes.func,
  manualList: PropTypes.arrayOf(PropTypes.object),
  compList: PropTypes.arrayOf(PropTypes.object),
  setSelectedCompItem: PropTypes.func,
  addEditorComponent: PropTypes.func,
  selectedCompItem: PropTypes.object,
};

EditorMgr.defaultProps = {
  getManualEditorMgr: () => false,
  resetManualEditorMgr: () => false,
  handleChangeCompIdx: () => false,
  isIndexRelationModal: false,
  setIsIndexRelationModal: () => false,
  treeData: fromJS([]),
  getMualList: () => false,
  getCompList: () => false,
  manualList: [],
  compList: [],
  setSelectedCompItem: () => false,
  addEditorComponent: () => false,
  selectedCompItem: {},
};

const mapStateToProps = createStructuredSelector({
  isIndexRelationModal: selectors.makeSelectIsIndexRelationModal(),
  treeData: selectors.makeSelectCategoryList(),
  manualList: selectors.makeSelectIndexRelationManual(),
  compList: selectors.makeSelectIndexRelationComponetList(),
  selectedCompItem: selectors.makeSelectedIndexRelationComponetIitem(),
});

const mapDispatchToProps = dispatch => ({
  getManualEditorMgr: () => dispatch(actions.getManualEditorMgrBySaga()),
  resetManualEditorMgr: () => dispatch(actions.resetEditorMgrByReduc()),
  handleChangeCompIdx: () => dispatch(actions.setEditorComponentIndexByReduc(0)),
  setIsIndexRelationModal: () => dispatch(actions.setIsIndexRelationModalByReducr(false)),
  getMualList: idx => dispatch(actions.getIndexRelationManualListBySaga(idx)),
  getCompList: idx => dispatch(actions.getIndexRelationComponetListBySaga(idx)),
  setSelectedCompItem: item => dispatch(actions.setIndexRelationComponetIitemByReducr(item)),
  addEditorComponent: compType => dispatch(actions.addEditorComponentByReduc(compType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorMgr);
