import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Input, Spin, Icon } from 'antd';
import PropTypes from 'prop-types';

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

import StyleDesign from './StyleDesign';

class StyleDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBodyHeight: 0,
      isButtonLoding: false,
    };
  }

  componentDidMount = () => {
    const { workSeq, viewType, viewID, getMetaData } = this.props;
    getMetaData(workSeq, viewType, viewID);
  };

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
    const { workSeq, getMetaData, compList } = this.props;
    const viewCnt = compList.filter(fNode => fNode.COMP_TYPE === 'VIEW').length;
    if (viewCnt > 0) {
      getMetaData(workSeq, viewType, key);
    } else {
      message.warning(<MessageContent>기본 INPUT 페이지부터 생성해주세요.</MessageContent>);
    }
  };

  handleSaveMetaData = () => this.setState({ isButtonLoding: true }, () => this.props.addMetaData(this.handleChangeIsButtonLoading));

  handleChangeIsButtonLoading = () => this.setState({ isButtonLoding: false });

  render = () => {
    const { isButtonLoding } = this.state;
    const { viewData, styleDesignAction, topMenus, styleMode, isLoadingContent, workName } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <StyledViewDesigner>
          <div className="view-designer">
            <div className="view-wrapper">
              <div className="view-inner">
                <div className={`view-content-wrapper ${styleMode ? 'single-wrapper' : ''}`}>
                  <Spin indicator={<Icon type="loading" />} spinning={isLoadingContent}>
                    <StyleDesign groups={viewData.CONFIG.property.layer.groups} action={styleDesignAction} />
                  </Spin>
                </div>
              </div>
            </div>
          </div>
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
          </div>
          <div className="button--group--right">
            {workName}
            <Input placeholder="페이지명(KO)" value={viewData.NAME_KOR} className="viewNameInput" disabled />
            <Button onClick={this.handleSaveMetaData} loading={isButtonLoding}>
              Save
            </Button>
          </div>
        </Header>
      </div>
    );
  };
}

StyleDesigner.propTypes = {
  workSeq: PropTypes.number,
  viewType: PropTypes.string,
  viewID: PropTypes.number,
  styleMode: PropTypes.bool,
  isLoadingContent: PropTypes.bool,
  styleDesignAction: PropTypes.shape({
    onChangeWidths: PropTypes.func,
    onChangeHeights: PropTypes.func,
    updateCellStyle: PropTypes.func,
  }),
};

StyleDesigner.defaultProps = {
  workSeq: 1538,
  viewType: 'INPUT',
  viewID: -1,
  styleMode: false,
  isLoadingContent: true,
  styleDesignAction: {
    onChangeWidths: () => {},
    onChangeHeights: () => {},
    updateCellStyle: () => {},
  },
};

const mapStateToProps = createStructuredSelector({
  activeTabKey: selectors.makeSelectActiveTabKey(),
  compList: selectors.makeSelectCompData(),
  topMenus: selectors.makeSelectTopMenus(),
  viewData: selectors.makeSelectViewData(),
  sysMetaList: selectors.makeSelectSysMetaList(),
  isLoadingContent: selectors.makeSelectIsLoadingContent(),
  compTreeData: selectors.makeSelectCompTreeData(),
  canDivide: selectors.makeSelectCanDivide(),
});

const mapDispatchToProps = dispatch => ({
  getMetaData: (workSeq, viewType, viewID) => dispatch(actions.getMetaDataBySaga(workSeq, viewType, viewID)),
  addMetaData: callbackFunc => dispatch(actions.addMetaDataBySaga(callbackFunc)),
  styleDesignAction: {
    onChangeWidths: (groupIndex, widths) => dispatch(actions.onChangeWidths(groupIndex, widths)),
    onChangeHeights: (groupIndex, heights) => dispatch(actions.onChangeHeights(groupIndex, heights)),
    updateCellStyle: (groupIndex, rowIndex, colIndex, key, value) =>
      dispatch(actions.updateCellStyle(groupIndex, Number(rowIndex), Number(colIndex), key, value)),
  },
});

const withReducer = injectReducer({ key: 'apps-mdcs-admin-StyleDesigner-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-admin-StyleDesigner-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(StyleDesigner);
