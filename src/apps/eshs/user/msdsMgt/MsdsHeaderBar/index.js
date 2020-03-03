import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Popconfirm } from 'antd';
import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';

class MsdsHeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  componentDidMount() {}

  saveTask = (id, reloadId) => {};

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {};

  handleSearch = () => {
    const { sagaKey: id, changeViewPage, formData } = this.props;
    const task_seq = (formData && formData.selectedRowTaskSeq) || 0;
    if (task_seq) {
      console.debug('여기는 handleSearch ', task_seq);
      changeViewPage(id, 3161, task_seq, 'MODIFY');
    }
  };

  handleModifyTask = () => {
    const { sagaKey: id, modifyTask } = this.props;
    modifyTask(id);
  };

  handleSaveTask = () => {
    console.debug('handleSaveTask  ', this.props);
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION');
    console.debug('여기는 오니????');
  };

  render = () => {
    console.debug('this.props', this.props);
    const {
      sagaKey: id,
      viewLayer,
      workFlowConfig,
      processRule,
      setProcessRule,
      loadingComplete,
      viewPageData,
      changeViewPage,
      workInfo,
      CustomWorkProcess,
      handleModalVisible,
      deleteTask,
      formData,
    } = this.props;
    const selectedRowItemCode = (formData && formData.selectedRowItemCode) || '';
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
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            <span>구성성분</span>
            <Input style={{ width: 150 }} value={selectedRowItemCode} />
            <Button shape="circle" icon="search" onClick={() => handleModalVisible()} />
            <StyledButton className="btn-primary" onClick={this.handleSearch}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary" onClick={this.handleModifyTask}>
              저장
            </StyledButton>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage)}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-primary">삭제</StyledButton>
            </Popconfirm>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
              Reset
            </StyledButton>
            <StyledButton className="btn-primary" onClick={this.handleSaveTask}>
              신규등록
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
              미리보기
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
              List
            </StyledButton>
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

MsdsHeaderBar.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  CustomWorkProcess: PropTypes.func,
};

MsdsHeaderBar.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  loadingComplete: () => {},
  CustomWorkProcess: undefined,
};

export default MsdsHeaderBar;
