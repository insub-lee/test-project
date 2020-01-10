import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tabs, Button, Input } from 'antd';
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

const { TabPane } = Tabs;

class ViewDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBodyHeight: 0,
    };
    this.handleChangeViewDesignerName = debounce(this.handleChangeViewDesignerName, 300);
  }

  componentDidMount = () => {
    const { workSeq, viewType, viewID, getMetaData, getComponentPoolList, getSysMetaList } = this.props;
    getMetaData(workSeq, viewType, viewID);
    // getComponentPoolList();
    // getSysMetaList();
    // this.setHeightSize(this.getSize());
    // window.addEventListener('resize', this.handleSize);
  };

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleSize);
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
      getMetaData(workSeq, viewType, key);
      // getComponentPoolList();
      // getSysMetaList();
    } else {
      message.warning(<MessageContent>기본 INPUT 페이지부터 생성해주세요.</MessageContent>);
    }
  };

  handleChangeViewDesignerName = value => {
    this.props.changeViewDesignerName(value);
  };

  render = () => {
    const { tabBodyHeight } = this.state;
    const {
      activeTabKey,
      isShowEditor,
      viewData,
      selectedKeys,
      canMerge,
      selectedStyleCells,
      structureDesignAction,
      styleDesignAction,
      toolbarAction,
      onChangeTab,
      addMetaData,
      compList,
      compListAction,
      changeViewDesignerName,
      topMenus,
      compPoolList,
      compGroupList,
      sysMetaList,
    } = this.props;
    return (
      <div>
        <Header>
          <div className="button--group--left">{`${viewData.NAME_KOR || 'New View Design'}(${viewData.COMP_TAG})`}</div>
          <div className="button--group--right">
            <TopMenus
              topMenus={topMenus}
              actions={[
                key => this.handleChangeViewDesigner('INPUT', key),
                key => this.handleChangeViewDesigner('MODIFY', key),
                key => this.handleChangeViewDesigner('VIEW', key),
                key => this.handleChangeViewDesigner('LIST', key),
              ]}
            />
          </div>
        </Header>
        <StyledViewDesigner>
          <div className="view-designer">
            <div className="view-wrapper">
              <div className="view-inner">
                <div className="view-sidebar view-sidebar-left">
                  <div>
                    <CompToolbar compPoolList={compPoolList} compGroupList={compGroupList} action={toolbarAction} />
                  </div>
                </div>
                <div className="view-content-wrapper">
                  <div className="top-button-wrapper">
                    <Button onClick={() => onChangeTab('1')}>Structure Design</Button>
                    <Button onClick={() => onChangeTab('2')}>Style Design</Button>
                    <Input
                      placeholder="페이지명(KO)"
                      defaultValue={viewData.NAME_KOR}
                      className="viewNameInput"
                      onChange={e => this.handleChangeViewDesignerName(e.target.value)}
                    />
                    <Button onClick={addMetaData}>Save</Button>
                  </div>
                  {/* <Tabs key="view-designer-tabs" activeKey={activeTabKey} onChange={onChangeTab}>
                    <TabPane tab="Structure Design" key="vd1">
                      <StructureDesign
                        isShowEditor={isShowEditor}
                        groups={viewData.CONFIG.property.layer.groups}
                        selectedKeys={selectedKeys}
                        canMerge={canMerge}
                        action={structureDesignAction}
                        tabBodyHeight={tabBodyHeight}
                        viewType={viewData.COMP_TAG}
                        compPoolList={compPoolList}
                      />
                    </TabPane>
                    <TabPane tab="Style Design" key="vd2">
                      <StyleDesign
                        isShowEditor={isShowEditor}
                        groups={viewData.CONFIG.property.layer.groups}
                        selectedKeys={selectedStyleCells}
                        bodyStyle={viewData.CONFIG.property.bodyStyle}
                        action={styleDesignAction}
                        tabBodyHeight={tabBodyHeight}
                      />
                    </TabPane>
                  </Tabs> */}
                  {activeTabKey === '1' && (
                    <StructureDesign
                      isShowEditor={isShowEditor}
                      groups={viewData.CONFIG.property.layer.groups}
                      selectedKeys={selectedKeys}
                      canMerge={canMerge}
                      action={structureDesignAction}
                      tabBodyHeight={tabBodyHeight}
                      viewType={viewData.COMP_TAG}
                      viewField={viewData.COMP_FIELD}
                      compPoolList={compPoolList}
                      hiddenField={viewData.CONFIG.property.layer.hiddenField || []}
                    />
                  )}
                  {activeTabKey === '2' && (
                    <StyleDesign
                      isShowEditor={isShowEditor}
                      groups={viewData.CONFIG.property.layer.groups}
                      selectedKeys={selectedStyleCells}
                      bodyStyle={viewData.CONFIG.property.bodyStyle}
                      action={styleDesignAction}
                      tabBodyHeight={tabBodyHeight}
                    />
                  )}
                </div>
                <div className="view-sidebar view-sidebar-left">
                  <div>
                    <CompFieldList compList={compList} sysMetaList={sysMetaList} layerIdxKey={viewData.CONFIG.property.layerIdxKey} action={compListAction} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StyledViewDesigner>
      </div>
    );
  };
}

ViewDesigner.propTypes = {
  workSeq: PropTypes.number,
  viewType: PropTypes.string,
  viewID: PropTypes.number,
  compPoolList: PropTypes.arrayOf(PropTypes.object),
};

ViewDesigner.defaultProps = {
  workSeq: 1538,
  viewType: 'INPUT',
  viewID: -1,
  compPoolList: [],
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
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: activeKey => dispatch(actions.changeActiveTab(activeKey)),
  addMetaData: () => dispatch(actions.addMetaDataBySaga()),
  changeViewDesignerName: value => dispatch(actions.changeViewDesignerNameByReducer(value)),
  getMetaData: (workSeq, viewType, viewID) => dispatch(actions.getMetaDataBySaga(workSeq, viewType, viewID)),
  getComponentPoolList: () => dispatch(actions.getComponentPoolListBySaga()),
  // getSysMetaList: () => dispatch(actions.getSysMetaListBySaga()),
  structureDesignAction: {
    openJsonCodeEditor: () => dispatch(actions.openJsonCodeEditor()),
    closeJsonCodeEditor: () => dispatch(actions.closeJsonCodeEditor()),
    updateJsonCode: jsObject => dispatch(actions.updateJsonCode(jsObject)),
    addRow: (groupIndex, rowIndex) => dispatch(actions.addRow(groupIndex, rowIndex)),
    removeRow: (groupIndex, rowIndex) => dispatch(actions.removeRow(groupIndex, rowIndex)),
    mergeCell: () => dispatch(actions.mergeCell()),
    divideCell: () => dispatch(actions.divideCell()),
    selectCell: ({ metaKey, ctrlKey }, groupIndex, rowIndex, colIndex) => dispatch(actions.selectCell(groupIndex, rowIndex, colIndex, metaKey || ctrlKey)),
    addGroup: () => dispatch(actions.addGroup()),
    changeGroupTitle: (groupIndex, title) => dispatch(actions.changeGroupTitle(groupIndex, title)),
    changeUseGroupTitle: (groupIndex, useTitle) => dispatch(actions.changeUseGroupTitle(groupIndex, useTitle)),
    changeCompData: (groupIndex, rowIndex, colIndex, key, value) => dispatch(actions.changeCompDataByReducer(groupIndex, rowIndex, colIndex, key, value)),
    removeColComp: (groupIndex, rowIndex, colIndex) => dispatch(actions.removeColCompByReducer(groupIndex, rowIndex, colIndex)),
    removeGroup: groupIndex => dispatch(actions.removeGroup(groupIndex)),
    changeViewCompData: (groupIndex, rowIndex, colIndex, key, value) =>
      dispatch(actions.changeViewCompDataByReducer(groupIndex, rowIndex, colIndex, key, value)),
    removeHiddenComp: compIndex => dispatch(actions.removeHiddenCompByReducer(compIndex)),
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
});

const withReducer = injectReducer({ key: 'apps-mdcs-admin-ViewDesigner-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-admin-ViewDesigner-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(ViewDesigner);
