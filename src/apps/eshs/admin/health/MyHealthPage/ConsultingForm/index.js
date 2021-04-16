import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Checkbox } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import BizMicroDevBase from 'components/BizMicroDevBase';
import Upload from './Upload';
const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      formData: {
        CONSULTING: 'Y',
        MAIL: 'Y',
      },
    };
  }

  componentDidMount() {
    const { list } = this.props;

    let seNo = '';
    this.setState({
      list: list.filter(item => {
        if (seNo !== item.SE_NO) {
          seNo = item.SE_NO;
          return true;
        }
        return false;
      }),
    });
  }

  changeFormData = (target, value) =>
    this.setState(prevState => ({ formData: { ...prevState.formData, [target]: value } }));

  save = () => {
    const {
      sagaKey,
      submitHandlerBySaga,
      saveAfter,
      modalVisible,
      spinningOn,
      spinningOff,
      profile,
      excelUpload,
    } = this.props;
    const { formData, list } = this.state;
    const content = formData.CONTENT || '';
    const fileInfo = (formData && formData.file) || {};
    const msg = this.saveBefore();
    const lIdx = list.length;
    const { MAIL, CONSULTING } = formData;
    if (msg) return this.showMessage(msg);

    const fileMaxSize = 300 * 1024 * 1024;
    let fileSize = 0;

    spinningOn();

    const submitData = new FormData();
    if (JSON.stringify(fileInfo) !== '{}') {
      fileSize = (fileInfo && fileInfo.size) || 0;
      submitData.append(fileInfo.uid, fileInfo);
    }
    submitData.append('CONTENT', content);
    submitData.append(
      'LIST',
      JSON.stringify(list.map(user => user.USER_ID))
        .replace('[', '(')
        .replace(']', ')'),
    );
    submitData.append('TITLE', (formData && formData.TITLE) || 'ESH 검진상담 메일');

    if (MAIL === 'Y') {
      if (fileSize > fileMaxSize) {
        spinningOff();
        return this.showMessage('첨부파일은 최대 300MB까지 전송 가능합니다.');
      }
    }

    if (CONSULTING === 'N' && MAIL === 'Y') {
      return excelUpload(sagaKey, '/api/eshs/v1/common/eshsMyHealthPageAttachEmailSend', submitData, {}, res => {
        if (res && res.result === 'SUCESS') {
          this.showMessage('메일이 성공적으로 전송되었습니다.');
          spinningOff();
          modalVisible();
        } else {
          this.showMessage(res.result);
          spinningOff();
        }
      });
    }

    return submitHandlerBySaga(
      sagaKey,
      'PUT',
      '/api/eshs/v1/common/health/eshsRealTimeSelfList',
      {
        PARAM: {
          ...formData,
          profile,
          CONTENT: content ? content.replace(/\n/gi, '<br>').replace(/ /gi, '&nbsp;') : '',
          list,
        },
      },
      (id, res) => {
        if (res && res.result === lIdx) {
          this.showMessage('상담내용이 저장되었습니다.');
          if (MAIL === 'Y') {
            return excelUpload(
              sagaKey,
              '/api/eshs/v1/common/eshsMyHealthPageAttachEmailSend',
              submitData,
              {},
              mailRes => {
                let msg = '';
                if (mailRes && mailRes.result === 'SUCESS') {
                  spinningOff();
                  modalVisible();
                  saveAfter();
                  msg = '메일이 성공적으로 전송되었습니다.';
                } else if (mailRes && mailRes.result) {
                  spinningOff();
                  msg = mailRes.result;
                } else {
                  spinningOff();
                  msg = '메일전송이 실패하였습니다';
                }

                return this.showMessage(msg);
              },
            );
          }

          spinningOff();
          saveAfter();
          return modalVisible();
        }

        spinningOff();
        if (MAIL === 'N') return this.showMessage('상담내용 저장이 실패하였습니다.');
        return this.showMessage('상담내용및 메일전송이 실패하였습니다.');
      },
    );
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  saveBefore = () => {
    const { formData } = this.state;
    const consulting = (formData && formData.CONSULTING) || 'N';
    const mail = (formData && formData.MAIL) || 'N';
    let msg = '';
    if (consulting === 'N' && mail === 'N') msg = '상담등록, 메일발송을 선택해주십시오';
    return msg;
  };

  render() {
    const { profile, modalVisible } = this.props;
    const { formData, list } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="10%" />
              <col width="40%" />
              <col width="10%" />
              <col width="40%" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr rowSpan={2}>
                <th>받는사람</th>
                <td colSpan={3}>
                  {list.map((item, index) => {
                    if (!(index % 8) && index)
                      return (
                        <span key={`span_${index}`}>
                          <br />
                          {`${item.EMP_NO}(${item.NAME_KOR}) `}
                        </span>
                      );
                    return <span key={`span_${index}`}>{`${item.EMP_NO}(${item.NAME_KOR}) `}</span>;
                  })}
                </td>
              </tr>
              <tr>
                <th>보내는사람</th>
                <td colSpan={3}>{profile.EMP_NO}</td>
              </tr>
              <tr>
                <th>제목</th>
                <td colSpan={3}>
                  <AntdInput className="ant-input-sm" onChange={e => this.changeFormData('TITLE', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>첨부파일</th>
                <td colSpan={3}>
                  <Upload onChangeFileInfo={file => this.changeFormData('file', file)} />
                </td>
              </tr>
              <tr>
                <th>상담등록</th>
                <td>
                  <Checkbox
                    checked={formData.CONSULTING === 'Y'}
                    onChange={e => this.changeFormData('CONSULTING', e.target.checked ? 'Y' : 'N')}
                  />
                </td>
                <th>메일발송</th>
                <td>
                  <Checkbox
                    checked={formData.MAIL === 'Y'}
                    onChange={e => this.changeFormData('MAIL', e.target.checked ? 'Y' : 'N')}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <AntdTextarea rows={8} onChange={e => this.changeFormData('CONTENT', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={modalVisible}>
            닫기
          </StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.save}>
            {formData.MAIL === 'Y' ? '메일보내기' : '저장'}
          </StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

const ConsultingForm = ({ list, modalVisible, saveAfter }) => (
  <BizMicroDevBase
    sagaKey="userSearchModal"
    modalVisible={modalVisible}
    saveAfter={saveAfter}
    list={list}
    component={Comp}
  ></BizMicroDevBase>
);

ConsultingForm.propTypes = {
  list: PropTypes.array,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.any,
};
ConsultingForm.defaultProps = {
  list: [],
  modalVisible: () => {},
  saveAfter: undefined,
};
Comp.propTypes = {
  list: PropTypes.array,
  submitHandlerBySaga: PropTypes.func,
  profile: PropTypes.object,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.func,
  sagaKey: PropTypes.string,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};
Comp.defaultProps = {
  list: [],
  submitHandlerBySaga: () => {},
  profile: {},
  modalVisible: () => {},
  saveAfter: undefined,
  sagaKey: '',
  spinningOn: () => {},
  spinningOff: () => {},
};

export default ConsultingForm;
