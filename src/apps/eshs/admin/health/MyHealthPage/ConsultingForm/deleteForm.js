import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import BizMicroDevBase from 'components/BizMicroDevBase';

class Comp extends Component {
  handleDelete = () => {
    const { sagaKey, submitHandlerBySaga, saveAfter, modalVisible, spinningOn, spinningOff, data } = this.props;

    spinningOn();

    return submitHandlerBySaga(sagaKey, 'DELETE', '/api/eshs/v1/common/health/eshsRealTimeSelfList', { PARAM: data }, (id, res) => {
      if (res && res.result === 1) {
        message.info(<MessageContent>삭제 완료하였습니다.</MessageContent>);
        spinningOff();
        saveAfter();
        return modalVisible();
      }
      spinningOff();
      return message.info(<MessageContent>정상적으로 삭제가 되지 않았습니다.</MessageContent>);
    });
  };

  render() {
    const { data, modalVisible } = this.props;
    return (
      <StyledContentsWrapper>
        <div dangerouslySetInnerHTML={{ __html: data.CONSULT }} />
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={modalVisible}>
            닫기
          </StyledButton>
          <Popconfirm title="삭제하시겠습니까?" onConfirm={this.handleDelete} okText="Yes" cancelText="No">
            <StyledButton className="btn-primary btn-sm">삭제</StyledButton>
          </Popconfirm>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

const DeleteForm = ({ data, modalVisible, saveAfter }) => (
  <BizMicroDevBase sagaKey="consultDeleteForm" modalVisible={modalVisible} saveAfter={saveAfter} data={data} component={Comp}></BizMicroDevBase>
);

DeleteForm.propTypes = {
  data: PropTypes.object,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.any,
};

DeleteForm.defaultProps = {
  data: {},
  modalVisible: () => {},
  saveAfter: undefined,
};

Comp.propTypes = {
  data: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.func,
  sagaKey: PropTypes.string,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

Comp.defaultProps = {
  data: {},
  submitHandlerBySaga: () => {},
  modalVisible: () => {},
  saveAfter: undefined,
  sagaKey: '',
  spinningOn: () => {},
  spinningOff: () => {},
};

export default DeleteForm;
