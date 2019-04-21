import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class CellWorkRenderer extends Component {
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
      // const data = {
      //   params: {
      //     PARAM: value,
      //   },
      // };
      return (
        <div style={{ width: '1070px' }}>
          <button style={{ border: '1px solid gray', padding: '2px', background: 'transparent' }} onClick={this.onClick}>{value}</button>
          <Modal
            title="InformNote"
            visible={this.state.visible}
            onOk={this.onClose}
            onCancel={this.onClose}
            style={{
              position: 'absolute',
              width: '1070px',
              height: '1000px',
              left: '2px',
            }}
          />
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

CellWorkRenderer.propTypes = {
  value: PropTypes.string.isRequired,
};
