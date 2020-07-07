import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import BizBuilderBase from 'components/BizBuilderBase';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { Input, Modal } from 'antd';
import CustomListPage from '../ListPage';

const AntdModal = StyledModalWrapper(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

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

  componentDidMount() {
    const { sagaKey: id, submitExtraHandler, formData } = this.props;
    const { WRK_CMPNY_CD } = formData;
    // `/api/eshs/v1/common/EshsCmpnyList?gubun=${gubun}`
    submitExtraHandler(id, 'GET', `/api/eshs/v1/common/EshsCmpnyList?searchType=selectOne&gubun=SW&wrkCmpnyCd=${WRK_CMPNY_CD}`, {}, this.initCallback);
  }

  initCallback = (id, response) => {
    const { formData, setFormData } = this.props;
    const { cmpnyInfo } = response;
    const nextFormData = {
      ...formData,
      PRSDNT_NM: cmpnyInfo.PRSDNT_NM || '등록된 대표자 이름이 없습니다.',
      ADDRESS: cmpnyInfo.ADDRESS || '등록된 업체주소가 없습니다.',
      TEL: cmpnyInfo.TEL || '등록된 업체 연락처가 없습니다.',
    };
    setFormData(id, nextFormData);
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

  modifyTaskCallback = (id, modifyWorkSeq, modifyTaskSeq) => {
    const { workSeq, getDetailData } = this.props;
    message.success(<MessageContent>서약서를 수정하였습니다.</MessageContent>);
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
                <StyledButton className="btn-primary btn-sm btn-first" onClick={() => modifyTask(id, id, this.modifyTaskCallback)}>
                  수정
                </StyledButton>
                <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.deletePledge()}>
                  삭제
                </StyledButton>
                <StyledButton className="btn-gray btn-sm btn-first" onClick={() => alert('준비중입니다.')}>
                  인쇄
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
