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

const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        CONSULTING: 'Y',
        MAIL: 'N', // 메일발송 미구현
      },
    };
  }

  componentDidMount() {}

  changeFormData = (target, value) =>
    this.setState(prevState => {
      const { formData } = prevState;
      return { formData: { ...formData, [target]: value } };
    });

  save = () => {
    const { sagaKey, submitHandlerBySaga, saveAfter, modalVisible, spinningOn, spinningOff, list, profile } = this.props;
    const { formData } = this.state;
    const content = formData.CONTENT || '';
    const msg = this.saveBefore();
    if (msg) return this.showMessage(msg);

    spinningOn();

    return submitHandlerBySaga(
      sagaKey,
      'PUT',
      '/api/eshs/v1/common/health/eshsRealTimeSelfList',
      { PARAM: { ...formData, profile, CONTENT: content ? content.replace(/\n/gi, '<br>').replace(/ /gi, '&nbsp;') : '', list } },
      (id, res) => {
        if (res && res.result > 0) {
          this.showMessage('저장하였습니다.');
          spinningOff();
          saveAfter();
          return modalVisible();
        }

        spinningOff();
        return this.showMessage('저장 실패!');
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
    const { list, profile, modalVisible } = this.props;
    const { formData } = this.state;
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
                <td colSpan={3}>메일 발송시 필요.. 메일 미구현으로 보류</td>
              </tr>
              <tr>
                <th>상담등록</th>
                <td>
                  <Checkbox checked={formData.CONSULTING === 'Y'} onChange={e => this.changeFormData('CONSULTING', e.target.checked ? 'Y' : 'N')} />
                </td>
                <th>메일발송</th>
                <td>
                  <Checkbox checked={formData.MAIL === 'Y'} onChange={e => message.info(<MessageContent>미구현</MessageContent>)} />
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
  <BizMicroDevBase sagaKey="userSearchModal" modalVisible={modalVisible} saveAfter={saveAfter} list={list} component={Comp}></BizMicroDevBase>
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
