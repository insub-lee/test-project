import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tabs, Button, Input, Spin, Icon, Popover, Modal } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Header from 'components/BizBuilder/Header';
import TopMenus from 'components/BizBuilder/TopMenus';

import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import CompToolbar from './CompToolbar';

import StructureDesign from './StructureDesign';
import StyleDesign from './StyleDesign';
import CompFieldList from './CompFieldList';
import ViewChangeProcessSetting from './ViewChangeProcessSetting';

// const { TabPane } = Tabs;

class ViewDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBodyHeight: 0,
      isButtonLoding: false,
      isMakeNewViewModal: false,
      viewType: '',
    };
    // this.handleChangeViewDesignerName = debounce(this.handleChangeViewDesignerName, 300);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount = () => {
    const { workSeq, viewType, viewID, getMetaData, getComponentPoolList, getSysMetaList } = this.props;
    window.addEventListener('keydown', this.handleKeyDown);
    getMetaData(workSeq, viewType, viewID);
    // getComponentPoolList();
    // getSysMetaList();
    // this.setHeightSize(this.getSize());
    // window.addEventListener('resize', this.handleSize);
  };

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleSize);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getSize = () => {
    const parentNode = document.querySelector('.view-content-wrapper');
    const tabsNode = document.querySelector('.view-content-wrapper .ant-tabs .ant-tabs-bar');
    const parentHeight = parentNode.offsetHeight;
    const parentHeightPaddingTop = parseFloat(getComputedStyle(parentNode).paddingTop);
    const parentHeightPaddingBottom = parseFloat(getComputedStyle(parentNode).paddingBottom);
    const tabsHeight = tabsNode.offsetHeight + 15;
    return parentHeight - tabsHeight - parentHeightPaddingTop - parentHeightPaddingBottom;
  };

  setHeightSize = size => {
    this.setState({ tabBodyHeight: size });
  };

  handleSize = () => {
    this.setHeightSize(this.getSize());
  };

  handleChangeViewDesigner = (viewType, key) => {
    const { workSeq, getMetaData, compList, getComponentPoolList, getSysMetaList } = this.props;
    const viewCnt = compList.filter(fNode => fNode.COMP_TYPE === 'VIEW').length;
    if (viewCnt > 0) {
      if (key === 0) {
        this.setState({ isMakeNewViewModal: true, viewType });
      } else {
        getMetaData(workSeq, viewType, key);
      }
    } else {
      message.warning(<MessageContent>기본 INPUT 페이지부터 생성해주세요.</MessageContent>);
    }
  };

  handleChangeViewDesignerName = value => {
    this.props.changeViewDesignerName(value);
  };

  handleSaveMetaData = () => this.setState({ isButtonLoding: true }, () => this.props.addMetaData(this.handleChangeIsButtonLoading));

  handleChangeIsButtonLoading = () => this.setState({ isButtonLoding: false });

  handleSetViewTitle = () => {
    const viewName = document.querySelector('.makeNewViewModalInput').value;
    if (viewName && viewName.length > 0) {
      const { viewType } = this.state;
      const { workSeq, getMetaData } = this.props;
      getMetaData(workSeq, viewType, 0, viewName);
      this.setState({ isMakeNewViewModal: false, viewType: '' });
    } else {
      message.warning(<MessageContent>페이지명은 필수입니다.</MessageContent>);
    }
  };

  handleKeyDown(event) {
    // event.keyCode === 83
    const charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey && charCode === 's') {
      event.preventDefault();
      this.handleSaveMetaData();
    }

    // For MAC we can use metaKey to detect cmd key
    if (event.metaKey && charCode === 's') {
      event.preventDefault();
      this.handleSaveMetaData();
    }
  }

  renderViewChangeProcessPopup = () => {
    const {
      workSeq,
      inputViewList,
      modifyViewList,
      viewViewList,
      listViewList,
      viewChangeProcessList,
      viewChangeProcessAction,
      selectedViewChangeProcess,
    } = this.props;
    return (
      <ViewChangeProcessSetting
        workSeq={workSeq}
        inputViewList={inputViewList}
        modifyViewList={modifyViewList}
        viewViewList={viewViewList}
        listViewList={listViewList}
        viewChangeProcessList={viewChangeProcessList}
        selectedViewChangeProcess={selectedViewChangeProcess}
        action={viewChangeProcessAction}
      />
    );
  };

  render = () => {
    const { tabBodyHeight, isButtonLoding, isMakeNewViewModal } = this.state;
    const {
      activeTabKey,
      isShowEditor,
      viewData,
      selectedKeys,
      canMerge,
      canDivide,
      selectedStyleCells,
      structureDesignAction,
      styleDesignAction,
      toolbarAction,
      onChangeTab,
      compList,
      compListAction,
      changeViewDesignerName,
      topMenus,
      compPoolList,
      compGroupList,
      compTreeData,
      sysMetaList,
      styleMode,
      isLoadingContent,
      workName,
      classNameList,
      dataNodeList,
    } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <StyledViewDesigner id="builderViewDesigner">
          <div className="view-designer">
            <div className="view-wrapper">
              <div className="view-inner">
                <div className="view-sidebar view-sidebar-left">
                  <div>
                    <CompFieldList compList={compList} sysMetaList={sysMetaList} layerIdxKey={viewData.CONFIG.property.layerIdxKey} action={compListAction} />
                    <CompToolbar
                      compPoolList={compPoolList}
                      compGroupList={compGroupList}
                      compTreeData={compTreeData}
                      action={{ ...toolbarAction, ...compListAction }}
                      compList={compList}
                      sysMetaList={sysMetaList}
                      layerIdxKey={viewData.CONFIG.property.layerIdxKey}
                    />
                  </div>
                </div>
                <div className={`view-content-wrapper ${styleMode ? 'single-wrapper' : ''}`}>
                  <Spin indicator={<Icon type="loading" />} spinning={isLoadingContent}>
                    <StructureDesign
                      isShowEditor={isShowEditor}
                      groups={viewData.CONFIG.property.layer.groups}
                      selectedKeys={selectedKeys}
                      canMerge={canMerge}
                      canDivide={canDivide}
                      action={structureDesignAction}
                      tabBodyHeight={tabBodyHeight}
                      viewType={viewData.COMP_TAG}
                      viewField={viewData.COMP_FIELD}
                      compPoolList={compPoolList}
                      compGroupList={compGroupList}
                      hiddenField={viewData.CONFIG.property.layer.hiddenField || []}
                      compList={compList.filter(fNode => fNode.COMP_TYPE === 'FIELD' && !fNode.isRemove) || []}
                      classNameList={classNameList}
                      dataNodeList={dataNodeList}
                    />
                  </Spin>
                </div>
              </div>
            </div>
          </div>
          <Modal
            className="makeNewViewModal"
            centered
            destroyOnClose
            footer={null}
            visible={isMakeNewViewModal}
            bodyStyle={{ padding: '10px' }}
            onCancel={() => this.setState({ isMakeNewViewModal: false })}
            closeIcon={<Button type="primary">취소</Button>}
            getContainer={() => document.querySelector('#builderViewDesigner')}
          >
            <span className="makeNewViewModalTitle">페이지명</span>
            <Input className="makeNewViewModalInput" />
            <Button type="primary" onClick={this.handleSetViewTitle}>
              확인
            </Button>
          </Modal>
        </StyledViewDesigner>
        <Header>
          <div className="button--group--left">
            <TopMenus
              topMenus={topMenus}
              actions={[
                key => this.handleChangeViewDesigner('INPUT', key),
                key => this.handleChangeViewDesigner('MODIFY', key),
                key => this.handleChangeViewDesigner('VIEW', key),
                key => this.handleChangeViewDesigner('LIST', key),
              ]}
              viewType={viewData.COMP_TAG}
              viewID={viewData.META_SEQ}
            />
            <Popover content={this.renderViewChangeProcessPopup()} title="화면 전환 설정" trigger="click">
              <Button style={{ verticalAlign: 'top' }}>화면 전환 설정</Button>
            </Popover>
          </div>
          <div className="button--group--right">
            {workName}
            <Input
              placeholder="페이지명(KO)"
              value={viewData.NAME_KOR}
              className="viewNameInput"
              onChange={e => this.handleChangeViewDesignerName(e.target.value)}
            />
            <Button onClick={this.handleSaveMetaData} loading={isButtonLoding}>
              Save
            </Button>
          </div>
        </Header>
      </div>
    );
  };
}

ViewDesigner.propTypes = {
  workSeq: PropTypes.number,
  viewType: PropTypes.string,
  viewID: PropTypes.number,
  styleMode: PropTypes.bool,
  compPoolList: PropTypes.arrayOf(PropTypes.object),
  isLoadingContent: PropTypes.bool,
  compTreeData: PropTypes.arrayOf(PropTypes.object),
  canMerge: PropTypes.shape({
    row: PropTypes.bool,
    col: PropTypes.bool,
  }),
  canDivide: PropTypes.shape({
    row: PropTypes.bool,
    col: PropTypes.bool,
  }),
  classNameList: PropTypes.arrayOf(PropTypes.object),
};

ViewDesigner.defaultProps = {
  workSeq: -1,
  viewType: 'INPUT',
  viewID: -1,
  styleMode: false,
  compPoolList: [],
  isLoadingContent: true,
  compTreeData: [],
  canMerge: {
    row: false,
    col: false,
  },
  canDivide: {
    row: false,
    col: false,
  },
  classNameList: [],
};

const mapStateToProps = createStructuredSelector({
  isShowEditor: selectors.makeSelectIsShowEditor(),
  // groups: selectors.makeSelectGroups(),
  selectedKeys: selectors.makeSelectSelectedKeys(),
  selectedStyleCells: selectors.makeSelectSelectedStyleCells(),
  canMerge: selectors.makeSelectCanMerge(),
  // bodyStyle: selectors.makeSelectBodyStyle(),
  activeTabKey: selectors.makeSelectActiveTabKey(),
  compList: selectors.makeSelectCompData(),
  topMenus: selectors.makeSelectTopMenus(),
  viewData: selectors.makeSelectViewData(),
  compPoolList: selectors.makeSelectCompPoolList(),
  compGroupList: selectors.makeSelectCompGroupList(),
  sysMetaList: selectors.makeSelectSysMetaList(),
  isLoadingContent: selectors.makeSelectIsLoadingContent(),
  compTreeData: selectors.makeSelectCompTreeData(),
  canDivide: selectors.makeSelectCanDivide(),
  classNameList: selectors.makeSelectClassNameList(),
  inputViewList: selectors.makeSelectInputViewList(),
  modifyViewList: selectors.makeSelectModifyViewList(),
  viewViewList: selectors.makeSelectViewViewList(),
  listViewList: selectors.makeSelectListViewList(),
  viewChangeProcessList: selectors.makeSelectViewChangeProcesslist(),
  dataNodeList: selectors.makeSelectDataNodeList(),
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: activeKey => dispatch(actions.changeActiveTab(activeKey)),
  addMetaData: callbackFunc => dispatch(actions.addMetaDataBySaga(callbackFunc)),
  changeViewDesignerName: value => dispatch(actions.changeViewDesignerNameByReducer(value)),
  getMetaData: (workSeq, viewType, viewID, viewName) => dispatch(actions.getMetaDataBySaga(workSeq, viewType, viewID, viewName)),
  getComponentPoolList: () => dispatch(actions.getComponentPoolListBySaga()),
  // getSysMetaList: () => dispatch(actions.getSysMetaListBySaga()),
  structureDesignAction: {
    openJsonCodeEditor: () => dispatch(actions.openJsonCodeEditor()),
    closeJsonCodeEditor: () => dispatch(actions.closeJsonCodeEditor()),
    updateJsonCode: jsObject => dispatch(actions.updateJsonCode(jsObject)),
    addRow: (groupIndex, rowIndex) => dispatch(actions.addRow(groupIndex, rowIndex)),
    // mergeCell: () => dispatch(actions.mergeCell()),
    // divideCell: () => dispatch(actions.divideCell()),
    addCell: () => dispatch(actions.addCell()),
    selectCell: ({ metaKey, ctrlKey }, groupIndex, rowIndex, colIndex) => dispatch(actions.selectCell(groupIndex, rowIndex, colIndex, metaKey || ctrlKey)),
    addGroup: () => dispatch(actions.addGroup()),
    changeGroupTitle: (groupIndex, title) => dispatch(actions.changeGroupTitle(groupIndex, title)),
    changeUseGroupTitle: (groupIndex, useTitle) => dispatch(actions.changeUseGroupTitle(groupIndex, useTitle)),
    changeCompData: (groupIndex, rowIndex, colIndex, key, value) => dispatch(actions.changeCompDataByReducer(groupIndex, rowIndex, colIndex, key, value)),
    changeCompConfig: (groupIndex, rowIndex, colIndex, subKey, key, value) =>
      dispatch(actions.changeCompConfigByReducer(groupIndex, rowIndex, colIndex, subKey, key, value)),
    removeColComp: (groupIndex, rowIndex, colIndex) => dispatch(actions.removeColCompByReducer(groupIndex, rowIndex, colIndex)),
    removeGroup: groupIndex => dispatch(actions.removeGroup(groupIndex)),
    changeViewCompData: (groupIndex, rowIndex, colIndex, key, value) =>
      dispatch(actions.changeViewCompDataByReducer(groupIndex, rowIndex, colIndex, key, value)),
    removeHiddenComp: compIndex => dispatch(actions.removeHiddenCompByReducer(compIndex)),
    changeColConfig: (groupIndex, rowIndex, colIndex, key, value) => dispatch(actions.changeColConfigByReducer(groupIndex, rowIndex, colIndex, key, value)),
    changeGroupData: (groupIndex, key, value) => dispatch(actions.changeGroupDataByReducer(groupIndex, key, value)),
    increaseRow: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.increaseRow(groupIndex, rowIndex, colIndex)),
    decreaseRow: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.decreaseRow(groupIndex, rowIndex, colIndex)),
    increaseCol: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.increaseCol(groupIndex, rowIndex, colIndex)),
    decreaseCol: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.decreaseCol(groupIndex, rowIndex, colIndex)),
    addRowToUp: (e, { groupIndex, rowIndex }) => dispatch(actions.addRowToUp(groupIndex, rowIndex)),
    addRowToDown: (e, { groupIndex, rowIndex }) => dispatch(actions.addRowToDown(groupIndex, rowIndex)),
    removeRow: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.removeRow(groupIndex, rowIndex, colIndex)),
    addColToLeft: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.addColToLeft(groupIndex, rowIndex, colIndex)),
    addColToRight: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.addColToRight(groupIndex, rowIndex, colIndex)),
    removeCol: (e, { groupIndex, rowIndex, colIndex }) => dispatch(actions.removeCol(groupIndex, rowIndex, colIndex)),
    mergeRow: () => dispatch(actions.mergeRow()),
    mergeCol: () => dispatch(actions.mergeCol()),
    divideRow: () => dispatch(actions.divideRow()),
    divideCol: () => dispatch(actions.divideCol()),
    onChangeTableSize: (groupIndex, tableSize) => dispatch(actions.onChangeTableSize(groupIndex, tableSize)),
    changeCompFieldData: (compKey, key, value) => dispatch(actions.changeCompFieldDataByReducer(compKey, key, value)),
    changeHiddenCompData: (compIdx, key, value) => dispatch(actions.changeHiddenCompDatByReducer(compIdx, key, value)),
    submitHandlerBySaga: (httpMethod, apiUrl, submitData, callbackFunc) => dispatch(actions.submitHandlerBySaga(httpMethod, apiUrl, submitData, callbackFunc)),
  },
  styleDesignAction: {
    openJsonCodeEditor: () => dispatch(actions.openJsonCodeEditor()),
    closeJsonCodeEditor: () => dispatch(actions.closeJsonCodeEditor()),
    updateJsonCode: jsObject => dispatch(actions.updateJsonCode(jsObject)),
    updateStyleWidth: (groupIndex, rowIndex, colIndex, width, diff) => dispatch(actions.updateStyleWidth(groupIndex, rowIndex, colIndex, width, diff)),
    updateStyleHeight: (groupIndex, rowIndex, colIndex, height) => dispatch(actions.updateStyleHeight(groupIndex, rowIndex, colIndex, height)),
    updateStyleSize: (groupIndex, rowIndex, colIndex, isLast, direction, style) =>
      dispatch(actions.updateStyleSize(groupIndex, rowIndex, colIndex, isLast, direction, style)),
    updateStyleRowHeight: (groupIndex, rowIndex, colIndex) => dispatch(actions.updateStyleRowHeight(groupIndex, rowIndex, colIndex)),
    updateBodyStyle: (width, height) => dispatch(actions.updateBodyStyle(width, height)),
    selectCell: (groupIndex, rowIndex, colIndex) => dispatch(actions.selectStyleCell(groupIndex, rowIndex, colIndex)),
  },
  toolbarAction: {
    setSelectToolbarItem: comp => dispatch(actions.setSelectToolbarItemByReducer(comp)),
  },
  compListAction: {
    removeCompItem: (layerIdx, compKey) => dispatch(actions.removeCompItemByReducer(layerIdx, compKey)),
    setViewDataCompItem: compItem => dispatch(actions.setViewDataCompItemByReducer(compItem)),
    setSysCompItem: compItem => dispatch(actions.setSysCompItemByReducer(compItem)),
  },
  viewChangeProcessAction: {
    saveViewChangeProcess: (formData, callbackFunc) => dispatch(actions.saveViewChangeProcessBySaga(formData, callbackFunc)),
  },
});

const withReducer = injectReducer({ key: 'apps-mdcs-admin-ViewDesigner-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-admin-ViewDesigner-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(ViewDesigner);
