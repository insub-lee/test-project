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

  render() {
    const { handleButtonClick } = this;
    const { visible, rowData } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <>
        <StyledButton className="btn-primary btn-sm" onClick={handleButtonClick} style={{ width: '100%' }}>
          평가문항 관리
        </StyledButton>
        <AntdModal
          visible={this.state.modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
          onOk={() => this.setState({ modalVisible: false })}
          footer={null}
          width="80%"
          style={{ textAlign: 'center' }}
          title="평가문항 등록"
        >
          <InputExamQuestion parentTaskSeq={rowData.TASK_SEQ} />
        </AntdModal>
      </>
    );
  }
}

EducationExamComp.propTypes = {
  rowData: PropTypes.object,
  visible: PropTypes.bool,
};

EducationExamComp.defatulProps = {
  sagaKey: '',
  changeFormData: null,
  rowData: null,
  visible: false,
};

export default EducationExamComp;
