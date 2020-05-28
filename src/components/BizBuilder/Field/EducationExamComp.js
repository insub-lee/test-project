import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import InputExamQuestion from 'apps/eshs/admin/safety/periodicalEducation/inputExamQuestion';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from '../styled/Buttons/StyledButton';

const AntdModal = StyledAntdModal(Modal);
// 유효성평가 문항관리 컴포넌트
class EducationExamComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ modalVisible: true });
  };

  handleSaveClick = () => {};

  handleModalClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { handleButtonClick, handleModalClose } = this;
    const { modalVisible } = this.state;
    const { visible, rowData, WORK_SEQ, CONFIG, authority } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <>
        <StyledButton className="btn-primary btn-sm" onClick={handleButtonClick} style={{ width: '100%' }}>
          {CONFIG.property.BTN_NAME || '이름을 등록하세요.'}
        </StyledButton>
        <AntdModal
          visible={modalVisible}
          onCancel={handleModalClose}
          onOk={handleModalClose}
          footer={null}
          width="80%"
          style={{ textAlign: 'center' }}
          title="평가문항 등록"
          destroyOnClose
        >
          <InputExamQuestion parentWorkSeq={WORK_SEQ} parentTaskSeq={rowData.TASK_SEQ} handleModalClose={handleModalClose} authority={authority} />
        </AntdModal>
      </>
    );
  }
}

EducationExamComp.propTypes = {
  rowData: PropTypes.object,
  visible: PropTypes.bool,
  WORK_SEQ: PropTypes.number,
  CONFIG: PropTypes.object,
};

EducationExamComp.defatulProps = {
  sagaKey: '',
  changeFormData: null,
  rowData: null,
  visible: false,
  WORK_SEQ: -1,
};

export default EducationExamComp;
