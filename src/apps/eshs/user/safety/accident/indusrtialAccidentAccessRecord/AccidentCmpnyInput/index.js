import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import SaveBtn from 'apps/eshs/user/safety/accident/indusrtialAccidentCmpnyMgt';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import { debounce } from 'lodash';

const AntdInput = StyledInput(Input);

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeFormData = debounce(this.changeFormData, 150);
  }

  componentDidMount = () => {
    const { sagaKey: id, setFormData, formData, initFormData, changeValidationData } = this.props;

    setFormData(id, { ...formData, ...initFormData });
    changeValidationData(id, 'BIZ_REG_NO', true, '');
  };

  saveTask = () => {
    const { sagaKey: id, saveTask, customSaveAfter, changeIsLoading, viewPageData, changeViewPage } = this.props;
    if (this.saveBefore()) {
      saveTask(
        id,
        id,
        (_, __, taskSeq) => {
          changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
          return customSaveAfter();
        },
        changeIsLoading,
      );
    }
  };

  saveBefore = (regNo = this.props?.formData?.BIZ_REG_NO) => {
    if (!regNo) {
      this.showMessage('사업자번호는 필수 항목입니다.');
      return false;
    }
    const bNum = regNo.replace(/-/gi, '');
    let sum = 0;
    const getlist = new Array(10);
    const chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');

    for (let i = 0; i < 10; i++) {
      getlist[i] = bNum.substring(i, i + 1);
    }

    for (let i = 0; i < 9; i++) {
      sum += getlist[i] * chkvalue[i];
    }
    sum += parseInt((getlist[8] * 5) / 10);
    const sidliy = sum % 10;
    let sidchk = 0;

    if (sidliy != 0) {
      sidchk = 10 - sidliy;
    } else {
      sidchk = 0;
    }
    if (sidchk != getlist[9]) {
      this.showMessage('사업자번호등록번호가 맞지 않습니다.');
      return false;
    }
    return true;
  };

  changeFormData = (target, value = null) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, target, value);
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  render() {
    const { modalClose, formData, initFormData } = this.props;
    console.debug('initFormData @@ ', formData);
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
            <thead></thead>
            <tfoot>
              <tr>
                <td colSpan={4} align="center">
                  <StyledButtonWrapper className="btn-wrap-inline">
                    <StyledButton className="btn-light btn-first btn-sm" onClick={modalClose}>
                      닫기
                    </StyledButton>
                    {/* <div style={{ display: 'inline-block', position: 'absolute' }}>
                      <SaveBtn inputMetaSeq={8921} formData={formData} customSaveBefore={this.saveBefore} saveAfter={saveAfter} />
                    </div> */}
                    <StyledButton className="btn-primary btn-sm" onClick={this.saveTask}>
                      저장
                    </StyledButton>
                  </StyledButtonWrapper>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <th>업체명</th>
                <td>
                  <AntdInput
                    placeholder="업체명"
                    allowClear
                    defaultValue={initFormData?.WRK_CMPNY_NM}
                    className="ant-input-sm ant-input-inline mr5"
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('WRK_CMPNY_NM', e?.target?.value)}
                  />
                </td>
                <th>사업자등록번호</th>
                <td>
                  <AntdInput
                    placeholder="사업자등록번호"
                    allowClear
                    defaultValue={initFormData?.BIZ_REG_NO}
                    className="ant-input-sm ant-input-inline mr5"
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('BIZ_REG_NO', e?.target?.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>장소</th>
                <td>
                  <AntdInput
                    placeholder="장소"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('PLACE', e?.target?.value)}
                  />
                </td>
                <th>사업관리번호</th>
                <td>
                  <AntdInput
                    placeholder="사업관리번호"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('BIZ_POB_NO', e?.target?.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>사업개시번호</th>
                <td>
                  <AntdInput
                    placeholder="사업개시번호"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('BIZ_COM_NO', e?.target?.value)}
                  />
                </td>
                <th>사업장 주소</th>
                <td>
                  <AntdInput
                    placeholder="사업장 주소"
                    allowClear
                    defaultValue={initFormData?.ADDRESS}
                    className="ant-input-sm ant-input-inline mr5"
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('ADDRESS', e?.target?.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

Comp.propTypes = {
  formData: PropTypes.object,
  customSaveAfter: PropTypes.func,
  modalClose: PropTypes.func,
};

Comp.defaultProps = {
  formData: {},
  customSaveAfter: () => {},
  modalClose: () => {},
};

const AccidentCmpnyInput = ({ formData, saveAfter, modalClose }) => (
  <BizBuilderBase
    sagaKey="ACCIDENT_CMPNY_INPUT"
    workSeq={2201}
    viewType="INPUT"
    taskSeq={-1}
    CustomInputPage={Comp}
    initFormData={formData}
    customSaveAfter={saveAfter}
    modalClose={modalClose}
  />
);

AccidentCmpnyInput.propTypes = {
  formData: PropTypes.object,
  saveAfter: PropTypes.func,
  modalClose: PropTypes.func,
};

AccidentCmpnyInput.defaultProps = {
  formData: {},
  saveAfter: () => {},
  modalClose: () => {},
};

export default AccidentCmpnyInput;
