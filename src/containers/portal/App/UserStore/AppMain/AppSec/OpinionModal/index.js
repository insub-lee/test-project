import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { intlObj, lang } from 'utils/commonUtils';
import { Button, Row, Col, Radio, Input } from 'antd';
import Draggable from 'react-draggable';
import StyleModal from 'containers/portal/components/Modal/StyleModal';
import messages from '../messages';
import AntRadiobox from '../../../components/uielements/radiobox.style';
import { BtnDkGray, BtnLgtGray } from '../../../components/uielements/buttons.style';

const RadioGroup = AntRadiobox(Radio.Group);
const radioOptionReturn = ['returnOption1', 'returnOption2', 'returnOption3', 'returnOption4'];
const { TextArea } = Input;

class OpposePage extends Component {
  constructor(props) {
    super(props);

    const { type, appAuthCnl } = props;

    this.state = {
      // 반려 사유 라디오 버튼 값
      value: 0,
      // 반려 사유 텍스트 박스 사용 여부
      disabled: true,
      // 반려 사유
      comment: type === 'R' ? radioOptionReturn[0] : lang.get('NAME', appAuthCnl[0]),
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { appAuthCnl, type } = this.props;

    if (e.target.value === 3) {
      this.setState({
        value: e.target.value,
        disabled: false,
        comment: '',
      });
    } else {
      this.setState(
        {
          comment: '',
        },
        () => {
          this.setState({
            value: e.target.value,
            disabled: true,
            comment: type === 'R' ? radioOptionReturn[e.target.value] : lang.get('NAME', appAuthCnl[e.target.value]),
          });
        },
      );
    }
  }

  commentOnChange = v => {
    this.setState({
      comment: v.target.value,
    });
  };

  returnRequest = () => {
    const { comment } = this.state;

    const { handleReturnRequest, selectedApp, loadingSet, closeModal } = this.props;

    const REQ_ID_ARR = selectedApp.map(app => app.SEC_REQ_ID);

    handleReturnRequest(REQ_ID_ARR, comment, loadingSet);

    closeModal();
  };

  cancelRequest = () => {
    const { comment } = this.state;

    const { handleCancelRequest, loadingSet, closeModal, selectedAppCancel } = this.props;

    handleCancelRequest(selectedAppCancel.SEC_REQ_ID, comment, loadingSet);

    closeModal();
  };

  render() {
    const { selectedApp, selectedAppCancel, appAuthCnl, type } = this.props;

    const { disabled, comment, value } = this.state;

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
          {/* 모달창 크기와 위치 개별적용, App심사 화면과 유사 */}
          <h2 className="modalTitle" style={{ cursor: 'move' }}>
            {type === 'R' ? intlObj.get(messages.returnAppSec) : intlObj.get(messages.cancelAppSec)}
            <Button className="modalClose" onClick={this.props.closeModal} title={intlObj.get(messages.close)} />
          </h2>
          <div className="modalContents" style={{ height: 369, paddingTop: 20 }}>
            <Row style={{ display: 'flex', flexFlow: 'row', borderBottom: '1px solid #cccccc' }}>
              <Col xl={12} style={{ width: 370 }}>
                <table className="opposeTargetTable">
                  <thead className="fixedHeader">
                    <tr>
                      <th>{type === 'R' ? intlObj.get(messages.secRequestUser) : intlObj.get(messages.canceledUser)}</th>
                      <th>{intlObj.get(messages.targetApp)}</th>
                    </tr>
                  </thead>
                  <ScrollBar autoHide autoHideTimeout={1000} style={{ width: '100%', height: 300, top: 35 }}>
                    <tbody>
                      {type === 'R' ? (
                        selectedApp.map(app => (
                          <tr>
                            <td>{lang.get('NAME', app)}</td>
                            <td>{lang.get('APP_NAME', app)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>{lang.get('NAME', selectedAppCancel)}</td>
                          <td>{lang.get('APP_NAME', selectedAppCancel)}</td>
                        </tr>
                      )}
                    </tbody>
                  </ScrollBar>
                </table>
              </Col>
              <Col xl={12} style={{ width: 430 }}>
                <div className="storeModal">
                  <p className="targetApp">{type === 'R' ? intlObj.get(messages.returnReason) : intlObj.get(messages.cancelReason)}</p>
                  <div className="grayBox" style={{ height: 297 }}>
                    <p>{intlObj.get(messages.multipleReason)}</p>
                    <RadioGroup onChange={this.onChange} value={this.state.value} style={{ width: '100%' }}>
                      {type === 'R'
                        ? radioOptionReturn.map((o, i) => (
                          <Radio key={o} value={i} style={radioStyle}>
                            {intlObj.get(messages[o])}
                          </Radio>
                        ))
                        : appAuthCnl.map((o, i) => (
                          <Radio key={o} value={i} style={radioStyle}>
                            {lang.get('NAME', o)}
                          </Radio>
                        ))}
                    </RadioGroup>
                    <TextArea
                      placeholder={intlObj.get(messages.comment)}
                      maxLength="50"
                      disabled={disabled}
                      onChange={this.commentOnChange}
                      // onKeyPress={handleKeyPress}
                      value={value === 3 ? comment : ''}
                      style={{ height: 90, marginLeft: 22 }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="modalFooter">
            <BtnLgtGray onClick={this.props.closeModal}>{intlObj.get(messages.cancel)}</BtnLgtGray>
            <BtnDkGray onClick={type === 'R' ? this.returnRequest : this.cancelRequest}>{intlObj.get(messages.confirmBtn)}</BtnDkGray>
          </div>
        </StyleModal>
      </Draggable>
    );
  }
}

OpposePage.propTypes = {
  selectedApp: PropTypes.array.isRequired,
  selectedAppCancel: PropTypes.object.isRequired,
  appAuthCnl: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  loadingSet: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleReturnRequest: PropTypes.func,
  handleCancelRequest: PropTypes.func,
};

OpposePage.defaultProps = {
  handleReturnRequest: undefined,
  handleCancelRequest: undefined,
};

export default OpposePage;
