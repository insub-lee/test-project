import React, { Component, Fragment } from 'react';
import { Modal } from 'antd';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CSManualView from 'apps/manual/user/CSManualView';

import * as actions from '../actions';
import selectors from '../selectors';
import StyleModal from './StyleModal';
import EditorToolBar from './EditorToolBar';
import EditorMenu from './EditorMenu';
import EditorTab from './EditorTab';
import EditorMain from './EditorMain';
import EditorIndex from './EditorIndex';
import IndexRelation from './IndexRelation';
import ParagraphLeft from './EditorMain/ParagraphTool/ParagraphLeft';
import ParagraphRight from './EditorMain/ParagraphTool/ParagraphRight';
import ParagraphTwo from './EditorMain/ParagraphTool/ParagraphTwo';
import ParagraphThree from './EditorMain/ParagraphTool/ParagraphThree';
import ParagraphFour from './EditorMain/ParagraphTool/ParagraphFour';
import ParagraphFirst from './EditorMain/ParagraphTool/ParagraphFirst';
import { modifyTool } from './EditorToolBar/ItemToolData';
import GGEditorModal from './GGEditorModal';

class EditorMgr extends Component {
  componentDidMount() {
    const { getManualEditorMgr } = this.props;
    getManualEditorMgr();
  }

  componentWillUnmount() {
    const { resetManualEditorMgr } = this.props;
    resetManualEditorMgr();
  }

  paragraphModalName = paragraphTypeIdx => {
    const { menus } = modifyTool;
    const selectedIdx = menus.findIndex(findNode => findNode.menuId === paragraphTypeIdx);
    let result = '';
    if (selectedIdx > -1) {
      result = `${menus[selectedIdx].menuName} 등록`;
    }
    return result;
  };

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
      isParagraphModal,
      setParagraphModal,
      paragraphTypeIdx,
      isPreviewModal,
      setPreviewModal,
      manualIndex,
      isGGEditorModal,
      setGGEditorModal,
    } = this.props;

    return (
      <>
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
          <Modal
            width={728}
            bodyStyle={{ height: 'calc(100vh - 256px)', padding: '4px' }}
            style={{ top: 42 }}
            visible={isParagraphModal}
            footer={null}
            onCancel={setParagraphModal}
            getContainer={() => document.querySelector('#manualMainContentWrapper')}
            title={this.paragraphModalName(paragraphTypeIdx)}
          >
            {paragraphTypeIdx === 30 && <ParagraphLeft addEditorComponent={addEditorComponent} />}
            {paragraphTypeIdx === 31 && <ParagraphRight addEditorComponent={addEditorComponent} />}
            {paragraphTypeIdx === 32 && <ParagraphTwo addEditorComponent={addEditorComponent} />}
            {paragraphTypeIdx === 33 && <ParagraphThree addEditorComponent={addEditorComponent} />}
            {paragraphTypeIdx === 34 && <ParagraphFour addEditorComponent={addEditorComponent} />}
            {paragraphTypeIdx === 35 && <ParagraphFirst addEditorComponent={addEditorComponent} />}
          </Modal>
          <Modal
            width={1198}
            bodyStyle={{ height: '800px', padding: '4px' }}
            style={{ top: 42 }}
            visible={isGGEditorModal}
            footer={null}
            onCancel={() => setGGEditorModal(false)}
            closable={false}
            destroyOnClose
          >
            <GGEditorModal setGGEditorModal={setGGEditorModal} addEditorComponent={addEditorComponent} />
          </Modal>
        </StyleModal>
        {isPreviewModal ? (
          <Modal
            width={1198}
            bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
            style={{ top: 42 }}
            visible={isPreviewModal}
            footer={null}
            onCancel={() => setPreviewModal(false)}
            closable={false}
            destroyOnClose
          >
            <CSManualView mualIdx={manualIndex} widgetId="preview" />
          </Modal>
        ) : (
          ''
        )}
      </>
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
  paragraphTypeIdx: PropTypes.number,
  isParagraphModal: PropTypes.bool,
  setParagraphModal: PropTypes.func,
  isPreviewModal: PropTypes.bool,
  isGGEditorModal: PropTypes.bool,
  setGGEditorModal: PropTypes.func,
  setPreviewModal: PropTypes.func,
  manualIndex: PropTypes.number,
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
  paragraphTypeIdx: 0,
  isParagraphModal: false,
  setParagraphModal: () => false,
  isPreviewModal: false,
  setPreviewModal: () => false,
  isGGEditorModal: false,
  setGGEditorModal: () => false,
  manualIndex: 0,
};

const mapStateToProps = createStructuredSelector({
  isIndexRelationModal: selectors.makeSelectIsIndexRelationModal(),
  treeData: selectors.makeSelectCategoryList(),
  manualList: selectors.makeSelectIndexRelationManual(),
  compList: selectors.makeSelectIndexRelationComponetList(),
  selectedCompItem: selectors.makeSelectedIndexRelationComponetIitem(),
  paragraphTypeIdx: selectors.makeSelectParagraphTypeIdx(),
  isParagraphModal: selectors.makeSelectIsParagraphModal(),
  isPreviewModal: selectors.makeSelectIsPreviewModal(),
  isGGEditorModal: selectors.makeSelectIsGGEditorModal(),
});

const mapDispatchToProps = dispatch => ({
  getManualEditorMgr: () => dispatch(actions.getManualEditorMgrBySaga()),
  resetManualEditorMgr: () => dispatch(actions.resetEditorMgrByReduc()),
  handleChangeCompIdx: () => dispatch(actions.setEditorComponentIndexByReduc(0)),
  setIsIndexRelationModal: () => dispatch(actions.setIsIndexRelationModalByReducr(false)),
  getMualList: idx => dispatch(actions.getIndexRelationManualListBySaga(idx)),
  getCompList: idx => dispatch(actions.getIndexRelationComponetListBySaga(idx)),
  setSelectedCompItem: item => dispatch(actions.setIndexRelationComponetIitemByReducr(item)),
  addEditorComponent: (compType, text) => {
    dispatch(actions.addEditorComponentByReduc(compType, text));
    if (compType === 'editor') dispatch(actions.setEditorParagraphByReducr(0, false));
  },
  setParagraphModal: () => dispatch(actions.setEditorParagraphByReducr(0, false)),
  setPreviewModal: flag => dispatch(actions.setPreviewModalByReducr(flag)),
  setGGEditorModal: flag => dispatch(actions.setGGEditorModalByReducr(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorMgr);
