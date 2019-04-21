import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import WorkOrder from '../Popup/WorkOrderDetailPopup';
// eslint-disable-next-line react/prefer-stateless-function /
export default class WorkOrderRenderer extends Component {
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
          PARAM: `000${value}`,
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
            <WorkOrder match={data} />
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

WorkOrderRenderer.propTypes = {
  value: PropTypes.string.isRequired,
};
