import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import ExtraBuilder from 'components/BizBuilderBase/viewComponent/ExtraBuilder';
import StyledButton from '../styled/Buttons/StyledButton';

class ListButtonComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    const { handleButtonClick } = this;
    const { visible, CONFIG, sagaKey, rowData } = this.props;
    if (!visible) {
      return null;
    }

    return (
      <>
        <StyledButton className="btn-primary btn-sm" onClick={handleButtonClick} style={{ width: '100%' }}>
          {CONFIG.property.BTN_NAME || 'Button'}
        </StyledButton>
        <Modal
          visible={this.state.modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
          onOk={() => this.setState({ modalVisible: false })}
          footer={null}
          width="80%"
        >
          <ExtraBuilder
            sagaKey={`sub${sagaKey}`}
            workSeq={CONFIG.property.SELECTED_BUILDER}
            viewType={CONFIG.property.VIEW_TYPE}
            parentTaskSeq={rowData.TASK_SEQ}
            parentWorkSeq={CONFIG.property.SELECTED_BUILDER}
          />
        </Modal>
      </>
    );
  }
}

ListButtonComp.propTypes = {
  visible: PropTypes.bool,
  CONFIG: PropTypes.object,
  sagaKey: PropTypes.string,
  rowData: PropTypes.object,
};

export default ListButtonComp;
