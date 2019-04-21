import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import Inform from '../Popup/InformNoteDetailPopup';
// eslint-disable-next-line react/prefer-stateless-function
export default class CellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClick() {
    this.setState({ visible: true });
  }

  onClose() {
    this.setState({ visible: false });
  }

  render() {
    /* eslint arrow-body-style: ["error", "always"] */
    const RenderSettingView = (value) => {
      const data = {
        params: {
          PARAM: value,
        },
      };
      return (
        <div style={{ width: '1070px' }}>
          <button style={{ padding: '2px', background: 'transparent' }} onClick={this.onClick}>{value}</button>
          <Modal
            title="InformNote"
            width= '900px'
            visible={this.state.visible}
            onOk={this.onClose}
            onCancel={this.onClose}
            centered={true}
          >
            <Inform match={data} />
          </Modal>
        </div>
      );
    };

    return (
      <div>
        {RenderSettingView(this.props.value)}
      </div>
    );
  }
}

CellRenderer.propTypes = {
  value: PropTypes.string.isRequired,
};
