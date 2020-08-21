import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import styled from 'styled-components';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const CustomBuilderSave = styled.div`
  .ant-spin-spinning {
    display: none;

    .ant-spin-dot {
      display: none;
    }
    .ant-spin-dot-spin {
      display: none;
    }
  }
`;

const saveBefore = (spinningOn, setFormData, saveFunc) => {
  spinningOn();
  setFormData();
  return saveFunc();
};

const SaveBtn = ({ ...props }) => {
  const {
    sagaKey: id,
    improveFormData,
    setFormData,
    saveTask,
    formData,
    viewPageData,
    changeViewPage,
    spinningOn,
    improveSave,
    profile,
    improveSaveBefore,
  } = props;

  return (
    <Popconfirm
      title={<pre>{`위험성평가 실시를 선택 하였습니다.\n요청완료 후 위험성평가 팝업화면에서 완료를 실시해 주세요.`}</pre>}
      okText="Yes"
      cancelText="No"
      onConfirm={() => {
        if (improveSaveBefore()) {
          return saveBefore(
            spinningOn,
            () =>
              setFormData(id, {
                ...formData,
                REG_GUBUN: '30462',
                END_YN: 'Y',
                TITLE: improveFormData.TITLE || '',
                EQUIP_ID: improveFormData.EQUIP_ID,
                DEPT_NM: profile.DEPT_NAME_KOR,
                DEPT_ID: profile.DEPT_ID,
                REG_EMPNO: profile.EMP_NO,
                REG_DTTM: improveFormData.REQ_DT,
                HAZARD_LIST: [
                  {
                    ...improveFormData,
                    SEQ: 1,
                    CHK: 'Y',
                    RA_YN: 'N',
                    WORK_NM: improveFormData.COMMENTS || '',
                    AOC_ID: `[${improveFormData.DANGERCAUSE}]`,
                    AOT_ID: improveFormData.DANGERTYPE,
                  },
                ],
              }),
            () =>
              saveTask(id, id, (_id, _reloadId, taskSeq) => {
                changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
                return improveSave({ ...improveFormData, DA_TASK_SEQ: taskSeq });
              }),
          );
        }
        return '';
      }}
    >
      <StyledButton className="btn-primary btn-sm mr5">저장</StyledButton>
    </Popconfirm>
  );
};

class UpdateBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskSeq: this.props.taskSeq,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevTaskSeq = prevState.taskSeq;
    const nextTaskSeq = nextProps.taskSeq;

    if (prevTaskSeq === nextTaskSeq) return null;
    const { sagaKey, viewPageData, changeViewPage } = nextProps;
    changeViewPage(sagaKey, viewPageData.workSeq, nextTaskSeq, 'MODIFY');
    return { taskSeq: nextTaskSeq };
  }

  render() {
    const {
      sagaKey: id,
      improveFormData,
      setFormData,
      modifyTask,
      formData,
      viewPageData,
      changeViewPage,
      spinningOn,
      improveSave,
      profile,
      taskSeq,
      improveSaveBefore,
    } = this.props;
    return (
      <Popconfirm
        title={<pre>{`위험성평가 실시를 선택 하였습니다.\n요청완료 후 위험성평가 팝업화면에서 완료를 실시해 주세요.`}</pre>}
        okText="Yes"
        cancelText="No"
        onConfirm={() => {
          if (improveSaveBefore()) {
            saveBefore(
              spinningOn,
              () =>
                setFormData(id, {
                  ...formData,
                  REG_GUBUN: '30462',
                  END_YN: 'Y',
                  TITLE: improveFormData.TITLE || '',
                  EQUIP_ID: improveFormData.EQUIP_ID,
                  DEPT_NM: profile.DEPT_NAME_KOR,
                  DEPT_ID: profile.DEPT_ID,
                  REG_EMPNO: profile.EMP_NO,
                  HAZARD_LIST: [
                    {
                      ...improveFormData,
                      SEQ: 1,
                      CHK: 'Y',
                      RA_YN: 'N',
                      WORK_NM: improveFormData.COMMENTS || '',
                      AOC_ID: `[${improveFormData.DANGERCAUSE}]`,
                      AOT_ID: improveFormData.DANGERTYPE,
                    },
                  ],
                }),
              () =>
                modifyTask(id, id, () => {
                  changeViewPage(id, viewPageData.workSeq, taskSeq, 'MODIFY');
                  return improveSave({ ...improveFormData, DA_TASK_SEQ: taskSeq });
                }),
            );
          }
          return '';
        }}
      >
        <StyledButton className="btn-primary btn-sm mr5">수정</StyledButton>
      </Popconfirm>
    );
  }
}

const HazardBuilder = ({ viewType, improveFormData = {}, taskSeq, spinningOn, spinningOff, improveSave, improveSaveBefore }) => (
  <CustomBuilderSave>
    <BizBuilderBase
      sagaKey={`CUSTOM_HAZARD_${viewType}`}
      workSeq={12061}
      viewType={viewType}
      spinningOn={spinningOn}
      spinningOff={spinningOff}
      taskSeq={taskSeq}
      improveFormData={improveFormData}
      improveSave={improveSave}
      improveSaveBefore={improveSaveBefore}
      CustomInputPage={SaveBtn}
      CustomModifyPage={UpdateBtn}
    />
  </CustomBuilderSave>
);

SaveBtn.propTypes = {
  sagaKey: PropTypes.string,
  improveFormData: PropTypes.object,
  setFormData: PropTypes.func,
  saveTask: PropTypes.func,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  changeViewPage: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  improveSave: PropTypes.func,
  improveSaveBefore: PropTypes.func,

  profile: PropTypes.object,
};
SaveBtn.defaultProps = {
  improveFormData: {},
  setFormData: () => {},
  saveTask: () => {},
  formData: {},
  viewPageData: {},
  changeViewPage: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  improveSave: () => {},
  improveSaveBefore: () => true,

  profile: {},
};
UpdateBtn.propTypes = {
  sagaKey: PropTypes.string,
  improveFormData: PropTypes.object,
  setFormData: PropTypes.func,
  modifyTask: PropTypes.func,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  changeViewPage: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  improveSave: PropTypes.func,
  profile: PropTypes.object,
  taskSeq: PropTypes.number,
  workSeq: PropTypes.number,
  improveSaveBefore: PropTypes.func,
};
UpdateBtn.defaultProps = {
  improveFormData: {},
  setFormData: () => {},
  modifyTask: () => {},
  formData: {},
  viewPageData: {},
  changeViewPage: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  improveSave: () => {},
  profile: {},
  improveSaveBefore: () => true,
};
HazardBuilder.propTypes = {
  viewType: PropTypes.string,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  improveFormData: PropTypes.object,
  improveSave: PropTypes.func,
  taskSeq: PropTypes.number,
  improveSaveBefore: PropTypes.func,
};
HazardBuilder.defaultProps = {
  viewType: 'INPUT',
  spinningOn: () => {},
  spinningOff: () => {},
  improveFormData: {},
  improveSave: () => {},
  improveSaveBefore: () => true,
  taskSeq: -1,
};

export default HazardBuilder;
