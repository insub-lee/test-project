import React, { Component } from 'react';
import { Modal, Radio, TimePicker, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const RadioGroup = Radio.Group;

export default class HyPmListPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      value: '',
      code: '',
      corp: '',
      corpValue: '',
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value, code: e.target.code });
  }

  onChangeName = (e) => {
    this.setState({ corpValue: e.target.value, corp: e.target.code });
  }

  handleOk = (e) => {
    if(this.state.code !== '') {
      this.props.handleSavePmCode(this.state.code, this.props.sheetNum);
    }

    if(this.state.corp !== '') {
      this.props.handleSaveCorp(this.state.corp, this.props.sheetNum);
    }

    this.props.handleSelectedCode(this.state.code, this.state.corp);
    this.props.goPmCode();
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
    const { codeList, pmSheetSdptList, detailData } = this.props;
    const infoData = detailData.list.ES_VEN_INFO[0];
    // const reasonData = detailData

    const codeIdx = codeList.findIndex(c => c.CODE_CD === infoData.ZREPM_CAUZ);
    const nameIdx = pmSheetSdptList.findIndex(c => c.CODE_CD === infoData.ZVEN_NAME);

    return (
      <div>
        <Modal
          visible={this.state.visible}
          width={'50%'}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
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
          <RadioGroup onChange={this.onChange} value={this.state.value === '' ? codeIdx : this.state.value}>
            {codeList.map((c, index) => (
              <li key={index} style={{ padding: '5px' }}>
                <Radio value = {index} code = {c.CODE_CD} >
                <span className="code" style={{ fontSize: '20px' }}>{c.CODE_CD}</span>
                </Radio>
              </li>
              ))}
          </RadioGroup>
        </div>
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
              도급사명 선택
            </span>
          </div>          
        </div>
        <div className="buttonArea" style={{ backgroundColor: 'gainsboro', padding: '10px' }}>
          <RadioGroup onChange={this.onChangeName} value={this.state.corpValue === '' ? nameIdx : this.state.corpValue}>
            {pmSheetSdptList.map((c, index) => (
              <li key={index} style={{ padding: '5px' }}>
                <Radio value = {index} code = {c.CODE_CD} >
                <span className="code" style={{ fontSize: '20px' }}>{c.CODE_CD}</span>
                </Radio>
              </li>
              ))}
          </RadioGroup>
        </div>
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
              당사작업시간
            </span>
          </div>          
        </div>
        <div className="buttonArea" style={{ backgroundColor: 'gainsboro', padding: '10px' }}>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>당사작업있음</Radio>
            시작
            <span className="date">
                    <DatePicker />
                  </span>
                  {/* time picker */}
                  <span className="time">
                    <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                  </span>
            -
            완료
            <TimePicker
              defaultOpenValue={moment(new Date(), 'HH:mm:ss')} 
              value={this.state.down_time}
              onChange={this.handleChangeDown_time}     
            />
            <Radio value={2}>당사작업없음</Radio>
          </RadioGroup>
        </div>
        </Modal>
      </div>
    );
  };
}
HyPmListPopup.propTypes = {
};
