import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
// import { fromJS } from 'immutable';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import StyleGlobalAdminDtl from './StyleGlobalAdminDtl';
import StyleGlobalAdminForm from './StyleGlobalAdminForm';
import { LinkBtnLgtGray, BtnDkGray, BtnDelete, LinkBtnList } from '../../../../store/components/uielements/buttons.style';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from '../messages';


const FormItem = Form.Item;
const { TextArea } = Input;

class GlobalAdminDtl extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      mode: prop.location.search.replace('?', ''),
      msgKey: prop.location.state.MSG_KEY,
      dscrKOR: prop.location.state.DSCR_KOR,
      dscrENG: prop.location.state.DSCR_ENG,
      dscrCHN: prop.location.state.DSCR_CHN,
      orgVal: prop.location.state,
      msgKeyValid: false,
      dscrKorValid: false,
      dscrEngValid: false,
      dscrChnValid: false,
    };
  }

  onChangeMsgKey = (e) => {
    this.setState({ msgKey: e.target.value });
    if (e.target.value !== '') this.setState({ msgKeyValid: true });
    else this.setState({ msgKeyValid: false });
  };
  onChangeDscrKOR = (e) => {
    this.setState({ dscrKOR: e.target.value });
    if (e.target.value !== '') this.setState({ dscrKorValid: true });
    else this.setState({ dscrKorValid: false });
  };
  onChangeDscrENG = (e) => {
    this.setState({ dscrENG: e.target.value });
    if (e.target.value !== '') this.setState({ dscrEngValid: true });
    else this.setState({ dscrEngValid: false });
  };
  onChangeDscrCHN = (e) => {
    this.setState({ dscrCHN: e.target.value });
    if (e.target.value !== '') this.setState({ dscrChnValid: true });
    else this.setState({ dscrChnValid: false });
  };

  regGlobalMsg = () => {
    if (this.vaildChk()) {
      const tempVal = {
        MSG_KEY: this.state.msgKey,
        DSCR_KOR: this.state.dscrKOR,
        DSCR_ENG: this.state.dscrENG,
        DSCR_CHN: this.state.dscrCHN,
      };
      this.setState({ orgVal: tempVal });
      this.props.registGlobalMsg(
        this.state.msgKey,
        this.state.dscrKOR,
        this.state.dscrENG,
        this.state.dscrCHN,
        this.props.history,
      );
      this.setState({ mode: 'D' });
    }
  }

  delConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.delGlobalMsg);
  }

  delGlobalMsg = () => {
    const delKeys = [this.state.msgKey];
    this.props.delGlobalMsg(delKeys, this.props.history);
  }

  udtConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`${intlObj.get(messages.udtConfirm)}`, '', this.udtGlobalMsg);
    }
  }

  udtGlobalMsg = () => {
    this.props.udtGlobalMsg(
      this.state.msgKey,
      this.state.dscrKOR,
      this.state.dscrENG,
      this.state.dscrCHN,
      this.props.history,
    );
    this.setState({ mode: 'D' });
  }

  vaildChk = () => {
    if (this.state.msgKeyValid
    && this.state.dscrKorValid
    && this.state.dscrEngValid
    && this.state.dscrChnValid) {
      if (this.state.mode !== 'I') {
        return true;
      }
      if (!this.props.globalMsgRes) return true;
      message.error(`${intlObj.get(messages.chkInput)}`, 2);
      return false;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  }

  dupliCheck = () => {
    if (this.state.msgKey !== undefined && this.state.msgKey !== '') {
      this.props.getGlobalMsg(this.state.msgKey);
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    const title = (mode) => {
      if (mode === 'I') return '다국어 메시지 등록';
      else if (mode === 'D') return '다국어 메시지 상세';
      else if (mode === 'U') return '다국어 메시지 수정';
      return '';
    };
    const dupliMsg = (mode, stat) => {
      if (mode === 'I' && this.state.msgKey !== '') {
        if (stat) return (<font color="RED">이미 존재하는 메시지 코드입니다.</font>);
        return (<font color="GREEN">사용가능한 메시지코드 입니다.</font>);
      }
      return '';
    };
    const botBtn = (mode) => {
      if (mode === 'I') { // 등록
        return (
          <React.Fragment>
            <LinkBtnLgtGray>
              <Link to="../GlobalAdmin/">취소</Link>
            </LinkBtnLgtGray>
            <BtnDkGray onClick={this.regGlobalMsg}>등록</BtnDkGray>
          </React.Fragment>
        );
      } else if (mode === 'D') { // 상세
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <BtnDelete onClick={this.delConfirm}>삭제</BtnDelete>
              <Link to="../GlobalAdmin/" style={{ marginLeft: 23 }}>
                <LinkBtnList>목록으로</LinkBtnList>
              </Link>
            </div>
            <BtnDkGray onClick={() => this.setState({
              mode: 'U',
              msgKeyValid: true,
              dscrKorValid: true,
              dscrEngValid: true,
              dscrChnValid: true,
             })}
            >수정
            </BtnDkGray>
          </React.Fragment>
        );
      } else if (mode === 'U') { // 수정
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <Link to="../GlobalAdmin/">
                <LinkBtnList>목록으로</LinkBtnList>
              </Link>
            </div>
            <LinkBtnLgtGray onClick={() => this.setState({
              mode: 'D',
              // msgKey: orgVal.MSG_KEY,
              dscrKOR: this.state.orgVal.DSCR_KOR,
              dscrENG: this.state.orgVal.DSCR_ENG,
              dscrCHN: this.state.orgVal.DSCR_CHN,
              })}
            >취소
            </LinkBtnLgtGray>
            <BtnDkGray onClick={this.udtConfirm}>저장</BtnDkGray>
          </React.Fragment>
        );
      }
      return '';
    };

    return (
      <div>
        <StyleGlobalAdminDtl>
          <h3 className="pageTitle regist">{title(this.state.mode)}</h3>
          <StyleGlobalAdminForm className={this.state.mode === 'D' ? 'modeD' : ''}>
            <Form>
              <table className="adminTbl globalLangTbl">
                <tbody>
                  <tr>
                    <th className="required">
                      <label htmlFor="d1">메시지코드</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="메시지코드"
                        hasFeedback={this.state.mode === 'I'}
                        validateStatus={this.state.msgKeyValid && !this.props.globalMsgRes ? 'success' : 'error'}
                      >
                        <Input
                          value={this.state.msgKey}
                          onChange={this.onChangeMsgKey}
                          onKeyUp={(e) => {
                            // 한글입력제한(임시)
                            this.setState({ msgKey: e.target.value.replace(/[^a-z0-9_]/gi, '') });
                          }}
                          onBlur={this.dupliCheck}
                          readOnly={this.state.mode === 'D' || this.state.mode === 'U'}
                          maxLength="20"
                          id="d1"
                        />
                        <span className="tipText">{dupliMsg(this.state.mode, this.props.globalMsgRes)}</span>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="d2">한국어(KOR)</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="한국어(KOR)"
                        hasFeedback={this.state.mode === 'I' || this.state.mode === 'U'}
                        validateStatus={this.state.dscrKorValid ? 'success' : 'error'}
                      >
                        <TextArea
                          value={this.state.dscrKOR}
                          onChange={this.onChangeDscrKOR}
                          readOnly={this.state.mode === 'D'}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d2"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="d3">영어(ENG)</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="영어(ENG)"
                        hasFeedback={this.state.mode === 'I' || this.state.mode === 'U'}
                        validateStatus={this.state.dscrEngValid ? 'success' : 'error'}
                      >
                        <TextArea
                          value={this.state.dscrENG}
                          onChange={this.onChangeDscrENG}
                          readOnly={this.state.mode === 'D'}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d3"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="d4">중국어(CHN)</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="중국어(CHN)"
                        hasFeedback={this.state.mode === 'I' || this.state.mode === 'U'}
                        validateStatus={this.state.dscrChnValid ? 'success' : 'error'}
                      >
                        <TextArea
                          value={this.state.dscrCHN}
                          onChange={this.onChangeDscrCHN}
                          readOnly={this.state.mode === 'D'}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d4"
                        />
                      </FormItem>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </StyleGlobalAdminForm>
          <div className="buttonWrapper">
            {botBtn(this.state.mode)}
          </div>
        </StyleGlobalAdminDtl>
      </div>
    );
  }
}

GlobalAdminDtl.propTypes = {
  getGlobalMsg: PropTypes.func, // eslint-disable-line
  globalMsgRes: PropTypes.bool, // eslint-disable-line
  registGlobalMsg: PropTypes.func, // eslint-disable-line
  delGlobalMsg: PropTypes.func, // eslint-disable-line
  udtGlobalMsg: PropTypes.func, // eslint-disable-line
  history: PropTypes.object, // eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getGlobalMsg: MSG_KEY =>
      dispatch(actions.getGlobalMsg(MSG_KEY)),
    registGlobalMsg: (MSG_KEY, DSCR_KOR, DSCR_ENG, DSCR_CHN, history) =>
      dispatch(actions.registGlobalMsg(MSG_KEY, DSCR_KOR, DSCR_ENG, DSCR_CHN, history)),
    delGlobalMsg: (delKeys, history) =>
      dispatch(actions.delGlobalMsg(delKeys, history)),
    udtGlobalMsg: (MSG_KEY, DSCR_KOR, DSCR_ENG, DSCR_CHN, history) =>
      dispatch(actions.udtGlobalMsg(MSG_KEY, DSCR_KOR, DSCR_ENG, DSCR_CHN, history)),
  }
);

const mapStateToProps = createStructuredSelector({
  globalMsgRes: selectors.makeSelectGlobalMsg(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'GlobalAdminDtl', saga });
const withReducer = injectReducer({ key: 'GlobalAdminDtl', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GlobalAdminDtl);
