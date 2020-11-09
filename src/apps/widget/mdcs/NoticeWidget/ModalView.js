import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Popconfirm } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import request from 'utils/request';

const modifyCustomButtons = ({ ...props }, dccGroup) => {
  const { sagaKey: id, reloadId, changeViewPage, viewPageData, saveBeforeProcess } = props;

  if (isDcc(props?.profile, dccGroup)) {
    return (
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-primary btn-sm mr5" onClick={() => saveBeforeProcess(id, reloadId || id)}>
          저장
        </StyledButton>
        <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST')}>
          목록
        </StyledButton>
      </StyledButtonWrapper>
    );
  }
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST')}>
        목록
      </StyledButton>
    </StyledButtonWrapper>
  );
};
const inputCustomButtons = ({ ...props }, dccGroup) => {
  const { sagaKey: id, tempSaveBeforeProcess, reloadId, saveBeforeProcess, changeViewPage, viewPageData } = props;
  if (isDcc(props?.profile, dccGroup)) {
    return (
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-primary btn-sm mr5" onClick={() => tempSaveBeforeProcess(id, reloadId || id)}>
          임시저장
        </StyledButton>
        <StyledButton className="btn-primary btn-sm mr5" onClick={() => saveBeforeProcess(id, reloadId)}>
          저장
        </StyledButton>
        <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST')}>
          목록
        </StyledButton>
      </StyledButtonWrapper>
    );
  }
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST')}>
        목록
      </StyledButton>
    </StyledButtonWrapper>
  );
};

const viewCustomButtons = ({ ...props }, dccGroup) => {
  const { sagaKey: id, changeViewPage, viewPageData, isBuilderModal, reloadId, deleteTask, changeBuilderModalStateByParent } = props;
  if (isDcc(props?.profile, dccGroup)) {
    return (
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-primary btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, viewPageData?.taskSeq, 'MODIFY')}>
          수정
        </StyledButton>
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() =>
            deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, (_id, _taskSeq) => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST'))
          }
          okText="Yes"
          cancelText="No"
        >
          <StyledButton className="btn-light btn-sm mr5">삭제</StyledButton>
        </Popconfirm>
        <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST')}>
          목록
        </StyledButton>
      </StyledButtonWrapper>
    );
  }
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'LIST')}>
        목록
      </StyledButton>
    </StyledButtonWrapper>
  );
};

const listCustomButtons = ({ ...props }, dccGroup) => {
  if (isDcc(props?.profile, dccGroup)) {
    const { sagaKey: id, changeViewPage, viewPageData } = props;
    return (
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-light btn-sm mr5" onClick={() => changeViewPage(id, viewPageData?.workSeq, -1, 'INPUT')}>
          추가
        </StyledButton>
      </StyledButtonWrapper>
    );
  }
  return [];
};

const isDcc = (profile = {}, dccGroup = []) => {
  const fidx = dccGroup.findIndex(user => user?.USER_ID === profile?.USER_ID);
  return fidx !== -1;
};
class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dccGroup: [],
    };
  }

  componentDidMount = () => {
    this.getDccGroup(res => {
      this.setState({ dccGroup: res });
    });
  };

  // DCC Vgroup
  getDccGroup = async (callBack = res => console.debug('!!! res', res)) =>
    await request({
      method: 'POST',
      url: '/api/admin/v1/common/vgroupMemberUListByPrntId',
      data: { PARAM: { PRNT_ID: 1001, SITE_ID: 1 } },
      json: true,
    }).then(({ response }) => callBack(response?.list || []));

  render() {
    const { viewType, workSeq, taskSeq } = this.props;
    return (
      <BizBuilderBase
        sagaKey="SearchView"
        viewType={viewType}
        ModifyCustomButtons={builderProps => modifyCustomButtons(builderProps, this.state.dccGroup)}
        InputCustomButtons={builderProps => inputCustomButtons(builderProps, this.state.dccGroup)}
        ViewCustomButtons={builderProps => viewCustomButtons(builderProps, this.state.dccGroup)}
        ListCustomButtons={builderProps => listCustomButtons(builderProps, this.state.dccGroup)}
        workSeq={workSeq}
        taskSeq={taskSeq}
      />
    );
  }
}

ModalView.propTypes = {
  viewType: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
};

ModalView.defaultProps = {};

export default ModalView;
