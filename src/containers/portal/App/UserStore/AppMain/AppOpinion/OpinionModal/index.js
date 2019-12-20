import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { Button, Row, Col, Radio, Input } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { intlObj, lang } from 'utils/commonUtils';
import StyleModal from 'containers/portal/components/Modal/StyleModal';
import Draggable from 'react-draggable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from '../Opinion/messages';
import reducer from '../Opinion/reducer';
import saga from '../Opinion/saga';

// import * as selectors from '../selectors';
import * as actions from '../Opinion/actions';

import AntRadiobox from '../../../components/uielements/radiobox.style';
import { BtnDkGray, BtnLgtGray } from '../../../components/uielements/buttons.style';

const RadioGroup = AntRadiobox(Radio.Group);
const { TextArea } = Input;

class OpposePage extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      value: '1',
      keyword: '',
      view: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeKeyWord = this.onChangeKeyWord.bind(this);
    this.onSaveOppo = this.onSaveOppo.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });

    if (e.target.value === '4') {
      this.setState({ view: false });
    } else {
      this.setState({ view: true });
    }
  }

  onChangeKeyWord(e) {
    this.setState({ keyword: e.target.value });
  }

  onSaveOppo() {
    const id = [];
    const ver = [];
    const appID = [];
    let key = this.state.keyword;

    this.props.selectedApp.map(list => id.push(list[0]));
    this.props.selectedApp.map(list => ver.push(list[3]));
    this.props.selectedApp.map(list => appID.push(list[6]));

    if (this.state.value === '1') {
      key = lang.get('NAME', this.props.radioList[0]);
    } else if (this.state.value === '2') {
      key = lang.get('NAME', this.props.radioList[1]);
    } else if (this.state.value === '3') {
      key = lang.get('NAME', this.props.radioList[2]);
    }

    this.props.oppoApps(id, appID, ver, key);

    this.props.closeModal('true');
  }

  render() {
    const { selectedApp } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Draggable handle="h2.modalTitle">
        <StyleModal
          style={{
            width: 840,
            height: 470,
            marginTop: '-235px',
            marginLeft: '-420px',
          }}
        >
          {' '}
          {/* 모달창 크기와 위치 개별적용, App권한승인 화면과 유사 */}
          <h2 className="modalTitle" style={{ cursor: 'move' }}>
            {intlObj.get(messages.appOppo)}
            <Button className="modalClose" onClick={this.props.closeModal} title={intlObj.get(messages.close)} />
          </h2>
          <div className="modalContents" style={{ height: 369, paddingTop: 20 }}>
            <Row style={{ display: 'flex', flexFlow: 'row', borderBottom: '1px solid #cccccc' }}>
              <Col xl={12} style={{ width: 370 }}>
                <table className="opposeTargetTable">
                  <thead className="fixedHeader">
                    <tr>
                      <th>{intlObj.get(messages.setApp)}</th>
                      <th>{intlObj.get(messages.oppinionUser)}</th>
                    </tr>
                  </thead>
                  <ScrollBar autoHide autoHideTimeout={1000} style={{ width: '100%', height: 300, top: 35 }}>
                    <tbody>
                      {selectedApp.map(app => (
                        <tr>
                          <td>{app[1]}</td>
                          <td>
                            {app[2]}({app[5]})
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </ScrollBar>
                </table>
              </Col>
              <Col xl={12} style={{ width: 430 }}>
                <div className="storeModal">
                  <p className="targetApp">{intlObj.get(messages.returnReason)}</p>
                  <div className="grayBox" style={{ height: 297 }}>
                    <p>
                      {/* {intlObj.get(messages.selectReason)} : <br /> */}
                      {intlObj.get(messages.selectOne)}
                    </p>
                    <RadioGroup onChange={this.onChange} value={this.state.value} style={{ width: '100%' }}>
                      {this.props.radioList.map(list => (
                        <Radio value={list.CODE_CD} key={list.CODE_CD} style={radioStyle}>
                          {lang.get('NAME', list)}
                        </Radio>
                      ))}
                    </RadioGroup>
                    <TextArea
                      placeholder={intlObj.get(messages.comment)}
                      maxLength="50"
                      onChange={this.onChangeKeyWord}
                      disabled={this.state.view}
                      style={{ height: 90, marginLeft: 22 }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="modalFooter">
            <BtnLgtGray onClick={this.props.closeModal}>{intlObj.get(messages.cancel)}</BtnLgtGray>
            <BtnDkGray onClick={this.onSaveOppo}>{intlObj.get(messages.confirmBtn)}</BtnDkGray>
          </div>
        </StyleModal>
      </Draggable>
    );
  }
}

OpposePage.propTypes = {
  selectedApp: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  radioList: PropTypes.array.isRequired,
  oppoApps: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    oppoApps: (id, appID, ver, comment) => dispatch(actions.oppoApps(id, appID, ver, comment)),
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'oppoList', reducer });
const withSaga = injectSaga({ key: 'oppoList', saga });

export default compose(withReducer, withSaga, withConnect)(OpposePage);
