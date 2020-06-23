import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { Input, Modal } from 'antd';
import CustomListPage from '../ListPage';

const AntdModal = StyledModalWrapper(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      modalType: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRule, workFlowConfig, workPrcProps } = this.props;
    const {
      info: { PRC_ID },
    } = workFlowConfig;
    if (PRC_ID !== -1) {
      const payload = {
        PRC_ID,
        DRAFT_DATA: {
          ...workPrcProps,
        },
      };
      getProcessRule(id, payload);
    }
  }

  // 기존 SaveTaskAfter
  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const {
      onCloseModalHandler,
      changeViewPage,
      isBuilderModal,
      reloadId,
      isSaveModalClose,
      changeBuilderModalStateByParent,
      workInfo,
      redirectUrl,
    } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler(id, redirectUrl);
    }
    if (isBuilderModal) {
      changeViewPage(reloadId, workSeq, -1, 'LIST');
      if (isSaveModalClose) changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
    this.savePledgeCallbackFunc(id, formData);
  };

  // 저장후, PLEDGE_NO - 호출 및 FormData
  savePledgeCallbackFunc = (id, formData) => {
    const { submitExtraHandler } = this.props;
    const param = {
      PARAM: {
        ...formData,
      },
    };
    submitExtraHandler(id, 'POST', '/api/eshs/v1/common/pledge', param, this.setFormDataForPledgeNo);
  };

  setFormDataForPledgeNo = (id, response) => {
    const { setFormData } = this.props;
    const { nextFormData } = response;
    const nextFormValid = nextFormData && nextFormData.PLEDGE_NO && true;
    if (nextFormValid) {
      message.success(<MessageContent>서약서를 추가하였습니다.</MessageContent>);
      setFormData(id, nextFormData);
    }
  };

  deletePledge = () => {
    const { sagaKey: id, deleteTask, changeViewPage, viewPageData } = this.props;
    const { workSeq, taskSeq } = viewPageData;
    message.success(<MessageContent>서약서를 삭제하였습니다.</MessageContent>);
    deleteTask(id, id, workSeq, taskSeq, changeViewPage, () => changeViewPage(id, workSeq, -1, 'INPUT'));
  };

  resetPage = () => {
    const { sagaKey: id, changeViewPage, workSeq } = this.props;
    changeViewPage(id, workSeq, -1, 'INPUT');
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
      CustomWorkProcess,
      formData,
      workInfo,
      saveTask,
      workSeq,
    } = this.props;
    const { modalVisible } = this.state;
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
          <StyledViewDesigner>
            <Sketch {...bodyStyle}>
              <StyledCustomSearchWrapper>
                <div className="search-input-area">
                  <span className="text-label">서약서코드</span>
                  <AntdSearch
                    className="ant-search-inline input-search-mid mr5"
                    onClick={() => this.handleModalVisible('searchPledge', true)}
                    value={(formData.PLEDGE_NO && formData.PLEDGE_NO) || ''}
                    style={{ width: '200px' }}
                  />
                </div>
              </StyledCustomSearchWrapper>
              <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
                <StyledButton className="btn-primary btn-sm btn-first" onClick={() => saveTask(id, id, this.saveTaskAfter)}>
                  추가
                </StyledButton>
                <StyledButton className="btn-gray btn-sm btn-first" onClick={this.resetPage}>
                  초기화
                </StyledButton>
              </StyledButtonWrapper>
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

InputPage.propTypes = {
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

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  loadingComplete: () => false,
};

export default InputPage;
