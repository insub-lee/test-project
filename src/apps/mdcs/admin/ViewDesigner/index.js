import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tabs, Button } from 'antd';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import StyledViewDesigner from 'apps/mdcs/styled/StyledViewDesigner';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import CompToolbar from './CompToolbar';

import StructureDesign from './StructureDesign';
import StyleDesign from './StyleDesign';

const { TabPane } = Tabs;

class ViewDesigner extends Component {
  componentDidMount = () => {
    const { workSeq, viewType, setWorkInfo } = this.props;
    console.debug('did', workSeq, viewType);
    setWorkInfo(workSeq, viewType);
  };

  render = () => {
    const {
      activeTabKey,
      isShowEditor,
      groups,
      selectedKeys,
      canMerge,
      selectedStyleCells,
      bodyStyle,
      structureDesignAction,
      styleDesignAction,
      toolbarAction,
      onChangeTab,
      addMetaData,
    } = this.props;
    return (
      <StyledViewDesigner>
        <div className="view-designer">
          <div className="view-wrapper">
            <div className="view-inner">
              <div className="view-sidebar view-sidebar-left">
                <div>leftmenu</div>
                <div>
                  <CompToolbar toolbarAction={toolbarAction} />
                </div>
              </div>
              <div className="view-content-wrapper">
                <Tabs activeKey={activeTabKey} onChange={onChangeTab}>
                  <TabPane tab="Structure Design" key="1">
                    <StructureDesign
                      isShowEditor={isShowEditor}
                      groups={groups}
                      selectedKeys={selectedKeys}
                      canMerge={canMerge}
                      action={structureDesignAction}
                    />
                  </TabPane>
                  <TabPane tab="Style Design" key="2">
                    <StyleDesign
                      isShowEditor={isShowEditor}
                      groups={groups}
                      selectedKeys={selectedStyleCells}
                      bodyStyle={bodyStyle}
                      action={styleDesignAction}
                    />
                  </TabPane>
                </Tabs>
                <div className="top-button-wrapper">
                  <Button onClick={addMetaData}>Save</Button>
                </div>
              </div>
              <div className="view-sidebar view-sidebar-left">rightmenu</div>
            </div>
          </div>
        </div>
      </StyledViewDesigner>
    );
  };
}

ViewDesigner.propTypes = {
  workSeq: PropTypes.number,
  viewType: PropTypes.string,
};

ViewDesigner.defaultProps = {
  workSeq: 1538,
  viewType: 'INPUT',
};

const mapStateToProps = createStructuredSelector({
  isShowEditor: selectors.makeSelectIsShowEditor(),
  groups: selectors.makeSelectGroups(),
  selectedKeys: selectors.makeSelectSelectedKeys(),
  selectedStyleCells: selectors.makeSelectSelectedStyleCells(),
  canMerge: selectors.makeSelectCanMerge(),
  bodyStyle: selectors.makeSelectBodyStyle(),
  activeTabKey: selectors.makeSelectActiveTabKey(),
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: activeKey => dispatch(actions.changeActiveTab(activeKey)),
  addMetaData: () => dispatch(actions.addMetaDataBySaga()),
  setWorkInfo: (workSeq, viewType) => dispatch(actions.setWorkInfoByReducer(workSeq, viewType)),
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
    setSelectToolbarItem: compType => dispatch(actions.setSelectToolbarItemByReducer(compType)),
  },
});

const withReducer = injectReducer({ key: 'apps-mdcs-admin-ViewDesigner-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-admin-ViewDesigner-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ViewDesigner);
