import React, { Component } from 'react';
import { Modal, Button, Table, PageHeader, Spin } from 'antd';
import PropTypes from 'prop-types';

const getStepTypeName = stepType => {
  let stepTypeNm = '사용자';
  if (stepType === 'D') stepTypeNm = '부서';
  else if (stepType === 'V') stepTypeNm = '그룹';
  return stepTypeNm;
};

const getGubunName = gubun => {
  let gubunNm = '결재';
  if (gubun === 2) gubunNm = '합의(개인)';
  else if (gubun === 3) gubunNm = '합의(부서)';
  else if (gubun === 4) gubunNm = '전결';
  return gubunNm;
};

class SignLineConfirmModal extends Component {
  componentDidMount() {}

  handleOkModal = e => {
    const { processInfo, saveProcessInfo, updateProcessInfo } = this.props;

    if (processInfo.PRC_ID === -1) {
      saveProcessInfo(e);
    } else {
      updateProcessInfo(e);
    }
  };

  handleCloselModal = () => {
    const { closeHandler } = this.props;
    closeHandler();
  };

  render() {
    const { visible, processInfo, processStep, spinning } = this.props;
    const columns = [
      {
        title: '단계',
        dataIndex: 'STEP',
        key: 'step',
        render: text => `${text}단계`,
      },
      {
        title: '유형',
        dataIndex: 'STEP_TYPE',
        key: 'stepType',
        render: text => getStepTypeName(text),
      },
      {
        title: '결재구분',
        dataIndex: 'GUBUN',
        key: 'gubun',
        render: text => getGubunName(text),
      },
      {
        title: '결재자',
        dataIndex: 'stepUsersName',
        key: 'stepUsersName',
      },
    ];

    return (
      <Modal
        title="결재선 확인"
        visible={visible}
        onOk={e => this.handleOkModal(e)}
        onCancel={this.handleCloselModal}
        width="80%"
        style={{ top: 20 }}
        footer={[
          <Button key="back" onClick={this.handleCloselModal}>
            닫기
          </Button>,
          <Button key="ok" type="primary" onClick={e => this.handleOkModal(e)}>
            확인
          </Button>,
        ]}
      >
        <Spin tip="Saving..." spinning={spinning}>
          <PageHeader title={processInfo.NAME_KOR} />
          <div style={{ marginTop: '10px' }}>
            <Table columns={columns} dataSource={processStep.map((item, index) => ({ ...item, key: index }))} bordered pagination={false} />
          </div>
        </Spin>
      </Modal>
    );
  }
}

SignLineConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  processInfo: PropTypes.object.isRequired,
  processStep: PropTypes.array.isRequired,
  closeHandler: PropTypes.func.isRequired,
  saveProcessInfo: PropTypes.func.isRequired,
  updateProcessInfo: PropTypes.func.isRequired,
  spinning: PropTypes.bool.isRequired,
};

export default SignLineConfirmModal;
