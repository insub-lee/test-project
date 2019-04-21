import React, { Component } from 'react';
import { Modal, Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;

export default class HyPmListPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      value: '',
      code: '',
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value, code: e.target.code });
  }

  handleOk = (e) => {
    this.props.handleSavePmCode(this.state.code, this.props.sheetNum);
    this.props.handleSelectedCode(this.state.code);
    this.setState({
      visible: false,
    }); 
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { codeList } = this.props;

    return (
      <div>
        <Modal
          visible={this.state.visible}
          width={'20%'}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 30,
            }}
          >
            <span
              style={{
                marginLeft: 10,
              }}
            >
              비정기/재PM 사유 선택
            </span>
          </div>          
        </div>
        <div className="buttonArea" style={{ backgroundColor: 'gainsboro', padding: '10px' }}>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            {codeList.map((c, index) => (
              <li key={index} style={{ padding: '5px' }}>
                <Radio value = {index} code = {c.CODE_CD} >
                <span className="code" style={{ fontSize: '20px' }}>{c.CODE_CD}</span>
                </Radio>
              </li>
              ))}
          </RadioGroup>
        </div>
        </Modal>
      </div>
    );
  };
}
HyPmListPopup.propTypes = {
};
