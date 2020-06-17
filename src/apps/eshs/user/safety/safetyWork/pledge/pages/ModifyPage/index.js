import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import BizBuilderBase from 'components/BizBuilderBase';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import { Input, Modal, Descriptions, Checkbox } from 'antd';
import Styled from './Styled';
import CustomListPage from '../ListPage';
const AntdModal = StyledModalWrapper(Modal);

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      cmpnyInfo: {
        WRK_CMPNY_CD: '',
      },
      modalType: '',
      modalVisible: false,
      pledgeList: [],
    };
  }

  deletePledge = () => {
    const { sagaKey: id, deleteTask, changeViewPage, viewPageData } = this.props;
    const { workSeq, taskSeq } = viewPageData;
    deleteTask(id, id, workSeq, taskSeq, changeViewPage, () => changeViewPage(id, workSeq, -1, 'INPUT'));
  };

  resetPage = () => {
    const { sagaKey: id, changeViewPage, workSeq } = this.props;
    changeViewPage(id, workSeq, -1, 'INPUT');
  };

  modifyTaskCallback = (id, modifyWorkSeq, modifyTaskSeq) => {
    const { workSeq, getDetailData } = this.props;
    getDetailData(id, workSeq, modifyTaskSeq, 'MODIFY');
  };

  handleModalVisible = (type, bool) => {
    this.setState({
      modalType: type,
      modalVisible: bool,
    });
  };

  handleListRowClick = record => {
    const { sagaKey: id, workSeq, getDetailData } = this.props;
    getDetailData(id, workSeq, record.TASK_SEQ, 'MODIFY');
    this.handleModalVisible('', false);
  };

  render = () => {
    const {
      sagaKey: id,
      viewLayer,
      workFlowConfig,
      processRule,
      setProcessRule,
      loadingComplete,
      viewPageData,
      workInfo,
      CustomWorkProcess,
      formData,
      modifyTask,
      workSeq,
    } = this.props;
    const { cmpnyInfo, modalVisible } = this.state;
    // Work Process 사용여부
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      const {
        info: { PRC_ID },
      } = workFlowConfig;

      // 로딩
      if (this.props.isLoading === false && this.state.initLoading) {
        this.setState(
          {
            initLoading: false,
          },
          () => loadingComplete(),
        );
      }
      return (
        <>
          <StyledSearchWrap>
            <Styled>
              <div className="search-group-layer">
                <div className="searchCmpnyWrap">
                  <label>
                    서약서코드
                    <Input
                      className="ant-input-sm"
                      style={{ width: '200px', marginLeft: '5px', marginRight: '5px' }}
                      readOnly
                      onClick={() => this.handleModalVisible('searchPledge', true)}
                      value={(formData.PLEDGE_NO && formData.PLEDGE_NO) || ''}
                    />
                  </label>
                </div>
                <div
                  className="searchCmpnyBtn"
                  tabIndex={0}
                  onClick={() => this.handleModalVisible('searchPledge', true)}
                  onKeyPress={() => this.handleModalVisible('searchPledge', true)} // esLint
                  role="button" // esLint
                >
                  <CaretDownOutlined />
                </div>
                <StyledButton
                  className="btn-primary btn-xs btn-first"
                  onClick={() => this.handleModalVisible('searchPledge', true)}
                  style={{ marginBottom: '5px' }}
                >
                  검색
                </StyledButton>
                <StyledButton
                  className="btn-primary btn-xs btn-first"
                  // (id, reloadId, workSeq, taskSeq, callbackFunc)
                  onClick={() => modifyTask(id, id, this.modifyTaskCallback)}
                  style={{ marginBottom: '5px' }}
                >
                  수정
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.deletePledge()} style={{ marginBottom: '5px' }}>
                  삭제
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => alert('준비중입니다.')} style={{ marginBottom: '5px' }}>
                  인쇄
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={this.resetPage} style={{ marginBottom: '5px' }}>
                  초기화
                </StyledButton>
              </div>
            </Styled>
          </StyledSearchWrap>
          <StyledViewDesigner>
            <Sketch {...bodyStyle}>
              {isWorkflowUsed &&
                PRC_ID !== -1 &&
                (typeof CustomWorkProcess === 'function' ? (
                  <CustomWorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
                ) : (
                  <WorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
                ))}
              <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            </Sketch>
          </StyledViewDesigner>
          <AntdModal
            title="서약서 검색"
            width="70%"
            visible={modalVisible}
            footer={null}
            onOk={() => this.handleModalVisible('', false)}
            onCancel={() => this.handleModalVisible('', false)}
          >
            <BizBuilderBase
              key={`${id}_search`}
              sagaKey={`${id}_search`}
              workSeq={workSeq}
              taskSeq={-1}
              viewType="LIST"
              CustomListPage={CustomListPage}
              customOnRowClick={record => this.handleListRowClick(record)}
            />
          </AntdModal>
        </>
      );
    }
    return '';
  };
}

ModifyPage.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModalHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  getExtraApiData: PropTypes.func,
  submitExtraHandler: PropTypes.func,
  setFormData: PropTypes.func,
  responseData: PropTypes.object,
  modifyTaskBySeq: PropTypes.func,
};

ModifyPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  loadingComplete: () => false,
};

export default ModifyPage;
