import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Modal, Spin } from 'antd';
import { isJSON } from 'utils/helpers';
import SignLine from 'apps/Workflow/SignLine';
import ApproveHistory from 'apps/Workflow/ApproveHistory';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import { DefaultStyleInfo } from 'components/BizBuilder/DefaultStyleInfo';
import { VIEW_TYPE, META_SEQ, FIRE_CODE } from 'apps/eshs/admin/safety/InspectionTarget/FireAirLineMask/internal_constants';
import IssueNote from 'apps/eshs/admin/safety/InspectionTarget/IssueNote';
import * as CustomButtons from 'apps/eshs/admin/safety/InspectionTarget/FireAirLineMask/Buttons';

const AntdModal = StyledModalWrapper(Modal);

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StyledWrap: StyledViewDesigner,
      activateModal: false,
      pageMetaSeq: '',
      viewType: VIEW_TYPE.VIEW,
      loading: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, draftId, workInfo } = this.props;

    if (workInfo.BUILDER_STYLE_PATH) {
      const StyledWrap = DefaultStyleInfo(workInfo.BUILDER_STYLE_PATH);
      this.setState({ StyledWrap });
    }

    if (draftId !== -1) {
      this.props.getDraftProcess(id, draftId);
    }
  }

  builderModalClose = () => {
    const { changeBuilderModalStateByParent } = this.props;
    changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
  };

  modalHandler = value => {
    this.setState({
      activateModal: value,
    });
  };

  pageMetaSeqHandler = (pageMetaSeq, viewType) => {
    this.setState({
      pageMetaSeq,
      viewType,
    });
  };

  onCloseModalAfterRefresh = () => {
    const { workSeq, getDetailData, sagaKey: id, taskSeq } = this.props;
    this.setState(
      {
        activateModal: false,
      },
      () => getDetailData(id, workSeq, taskSeq, 'VIEW'),
    );
  };

  openModal = changedSagaKey => {
    const { pageMetaSeq, viewType } = this.state;
    const { workSeq, sagaKey, taskSeq, formData } = this.props;
    switch (pageMetaSeq) {
      case META_SEQ.VIEW_INSPECTION_BY_CHIP: {
        return (
          <BizBuilderBase
            key={`${changedSagaKey}_MODAL`}
            sagaKey={`${changedSagaKey}_MODAL`}
            workSeq={workSeq} // metadata binding
            viewType={viewType}
            taskSeq={taskSeq} // data binding
            onCloseModalHandler={() => this.setState({ activateModal: false })}
            viewMetaSeq={pageMetaSeq}
            baseSagaKey={sagaKey}
            ViewCustomButtons={CustomButtons.ViewHistory}
            customViewPage={ViewPage}
          />
        );
      }
      case META_SEQ.VIEW_INSPECTION_BY_POSITON_NO: {
        return (
          <BizBuilderBase
            key={`${changedSagaKey}_MODAL`}
            sagaKey={`${changedSagaKey}_MODAL`}
            workSeq={workSeq} // metadata binding
            viewType={viewType}
            taskSeq={taskSeq} // data binding
            onCloseModalHandler={() => this.setState({ activateModal: false })}
            viewMetaSeq={pageMetaSeq}
            baseSagaKey={sagaKey}
            ViewCustomButtons={CustomButtons.ViewHistory}
            customViewPage={ViewPage}
          />
        );
      }
      case META_SEQ.INPUT_ISSUE_NOTE: {
        return (
          <BizBuilderBase
            key={`${changedSagaKey}_MODAL`}
            sagaKey={`${changedSagaKey}_MODAL`}
            workSeq={workSeq} // metadata binding
            viewType={viewType}
            taskSeq={taskSeq} // data binding
            onCloseModalHandler={this.onCloseModalAfterRefresh}
            inputMetaSeq={pageMetaSeq}
            baseSagaKey={sagaKey}
            InputCustomButtons={CustomButtons.IssueAdd}
            customViewPage={ViewPage}
          />
        );
      }
      case META_SEQ.INPUT_INSPECTION: {
        return (
          <BizBuilderBase
            key={`${changedSagaKey}_MODAL`}
            sagaKey={`${changedSagaKey}_MODAL`}
            workSeq={workSeq} // metadata binding
            viewType={viewType}
            taskSeq={taskSeq} // data binding
            onCloseModalHandler={this.onCloseModalAfterRefresh}
            inputMetaSeq={pageMetaSeq}
            baseSagaKey={sagaKey}
            handleModalLoading={this.handleModalLoading}
            InputCustomButtons={CustomButtons.RegInspection}
          />
        );
      }
      case META_SEQ.ISSUE_NOTE: {
        return <IssueNote fireCode={FIRE_CODE} positionNo={formData.POSITION_NO} />;
      }
      default:
        return '';
    }
  };

  modalTitle = () => {
    const { pageMetaSeq } = this.state;
    switch (pageMetaSeq) {
      case META_SEQ.VIEW_INSPECTION_BY_CHIP:
        return 'Air Line Mask함 점검 History';
      case META_SEQ.VIEW_INSPECTION_BY_POSITON_NO:
        return 'Air Line Mask함 점검 History';
      case META_SEQ.INPUT_ISSUE_NOTE:
        return 'Issue 등록';
      case META_SEQ.INPUT_INSPECTION:
        return '점검결과 입력';
      case META_SEQ.ISSUE_NOTE:
        return 'Issue Note';
      default:
        return '';
    }
  };

  handleModalLoading = bool => {
    this.setState({
      loading: bool,
    });
  };

  render = () => {
    const { sagaKey: id, reloadId, viewLayer, viewPageData, changeViewPage, draftId, deleteTask, isBuilderModal, ViewCustomButtons } = this.props;

    const { StyledWrap, activateModal } = this.state;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      return (
        <StyledWrap className={viewPageData.viewType}>
          <Sketch {...bodyStyle}>
            {draftId !== -1 && <SignLine id={id} draftId={draftId} />}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} readOnly />
            {draftId !== -1 && <ApproveHistory draftId={draftId} />}
            {ViewCustomButtons ? (
              <>
                <ViewCustomButtons viewMetaSeqHandler={this.pageMetaSeqHandler} modalHandler={this.modalHandler} {...this.props} />
                <AntdModal title={this.modalTitle()} width="80%" visible={activateModal} footer={null} destroyOnClose onCancel={() => this.modalHandler(false)}>
                  <Spin tip="처리중 ..." spinning={this.state.loading}>
                    {activateModal && this.openModal(`modal${id}`)}
                  </Spin>
                </AntdModal>
              </>
            ) : (
              <div className="alignRight">
                <StyledButton className="btn-primary btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
                  Modify
                </StyledButton>
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={() =>
                    deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, !isBuilderModal ? changeViewPage : this.builderModalClose)
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledButton className="btn-light btn-first">Delete</StyledButton>
                </Popconfirm>
                <StyledButton className="btn-light btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                  Revision
                </StyledButton>
                {!isBuilderModal && (
                  <StyledButton className="btn-light btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                    List
                  </StyledButton>
                )}
              </div>
            )}
          </Sketch>
        </StyledWrap>
      );
    }
    return '';
  };
}

ViewPage.propTypes = {
  sagaKey: PropTypes.string,
  draftId: PropTypes.number,
  getDraftProcess: PropTypes.func,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  formData: PropTypes.object,
  compProps: PropTypes.object,
  viewLayer: PropTypes.array,
  draftProcess: PropTypes.array,
  viewType: PropTypes.string,
  isLoading: PropTypes.bool,
  removeReduxState: PropTypes.func,
};

ViewPage.defaultProps = {
  draftId: -1,
  draftProcess: [],
};

export default ViewPage;
