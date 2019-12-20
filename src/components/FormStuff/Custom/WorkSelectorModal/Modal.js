import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, Table } from 'antd';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    console.debug('boot 두두두두두두둥')
  }

  render() {
    let {isOpenModal} = this.props;
    return (
      <AntdModal
        title={null}
        visible={isOpenModal}
        footer={null}
      >
        <AntdTable/>
      </AntdModal>
    );
  }
}

Modal.propTypes = {
  isOpenModal: PropTypes.bool,
};

Modal.defaultProps = {
  isOpenModal: false,
};

export default Modal;
