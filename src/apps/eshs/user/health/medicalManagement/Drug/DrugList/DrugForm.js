import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, DatePicker, Select, InputNumber, Popconfirm } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdInputNumber = StyledInputNumber(InputNumber);

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { SITE_NODE_ID: 317, PROPERSTOCK: 0 },
    };
  }

  changeFormData = (target, value) => this.setState(prevState => ({ formData: Object.assign(prevState.formData, { [target]: value }) }));

  handleAction = type => {
    const { sagaKey, submitHandlerBySaga, profile, defaultForm, modalVisible, getList, spinningOn, spinningOff } = this.props;
    const { formData } = this.state;
    const drug = (formData && formData.DRUG) || '';
    spinningOn();
    const submitData = {
      PARAM: {
        ...defaultForm,
        ...formData,
        EMP_NO: profile.EMP_NO,
        USER_ID: profile.USER_ID,
      },
    };
    switch (type) {
      case 'INPUT':
      case 'MODIFY':
        if (!drug) {
          spinningOff();
          return this.messageShow('품목을 입력해주십시오.');
        }
        submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/health/eshsHealthMedicine', submitData, (id, res) => {
          spinningOff();
          if (res && res.code === 200) {
            this.showMessage(type === 'INPUT' ? '저장되었습니다.' : '수정되었습니다.');
            modalVisible();
            return getList();
          }
          return this.showMessage(type === 'INPUT' ? '저장에 실패하였습니다.' : '수정에 실패하였습니다.');
        });
        break;
      case 'DELETE':
        submitHandlerBySaga(sagaKey, 'DELETE', '/api/eshs/v1/common/health/eshsHealthMedicine', submitData, (id, res) => {
          spinningOff();
          if (res && res.result === 1) {
            this.showMessage('삭제되었습니다.');
            modalVisible();
            return getList();
          }
          return this.showMessage('삭제에 실패하였습니다.');
        });
        break;
      default:
        break;
    }
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  render() {
    const { type, defaultForm, modalVisible, workAreaList } = this.props;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="30" />
              <col width="70" />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={2}>구급약품 {type === 'INPUT' ? '신규등록' : '관리'}</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <StyledButtonWrapper className="btn-wrap-inline">
                    <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleAction(type)}>
                      {type === 'INPUT' ? '저장' : '수정'}
                    </StyledButton>
                    {type !== 'INPUT' && (
                      <Popconfirm title="삭제하시겠습니까?" onConfirm={() => this.handleAction('DELETE')} okText="Yes" cancelText="No">
                        <StyledButton className="btn-light btn-first btn-sm ">삭제</StyledButton>
                      </Popconfirm>
                    )}
                    <StyledButton className="btn-light btn-sm" onClick={modalVisible}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <th>지역</th>
                <td>
                  <AntdSelect
                    className="select-sm mr5"
                    style={{ width: 100 }}
                    defaultValue={defaultForm.SITE_NODE_ID || 317}
                    allowClear
                    placeholder="지역"
                    onChange={val => this.changeFormData('SITE_NODE_ID', val)}
                    readOnly={type !== 'INPUT'}
                  >
                    {workAreaList
                      .filter(item => item.LVL === 1)
                      .map(item => (
                        <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                          {item.NAME_KOR}
                        </AntdSelect.Option>
                      ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>품목</th>
                <td>
                  <AntdInput
                    placeholder="품목"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    defaultValue={defaultForm.DRUG || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('DRUG', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>제약회사</th>
                <td>
                  <AntdInput
                    placeholder="제약회사"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    defaultValue={defaultForm.COMPANY || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('COMPANY', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>규격</th>
                <td>
                  <AntdInput
                    placeholder="규격"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    defaultValue={defaultForm.SIZE1 || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('SIZE1', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>단위</th>
                <td>
                  <AntdInput
                    placeholder="단위"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    defaultValue={defaultForm.UNIT || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.changeFormData('UNIT', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>유효기간</th>
                <td>
                  <AntdDatePicker
                    className="ant-picker-sm mr5"
                    style={{ width: '100%' }}
                    placeholder="유효기간"
                    defaultValue={defaultForm.VALIDITY_TERM ? moment(defaultForm.VALIDITY_TERM, 'YYYY-MM-DD') : undefined}
                    allowClear
                    onChange={(val, strVal) => this.changeFormData('VALIDITY_TERM', strVal)}
                  />
                </td>
              </tr>
              <tr>
                <th>적정재고</th>
                <td>
                  <AntdInputNumber
                    className="ant-input-number-sm"
                    style={{ width: '100%' }}
                    defaultValue={defaultForm.PROPERSTOCK || 0}
                    onChange={value => this.changeFormData('PROPERSTOCK', value)}
                    name="gasWeight"
                  />
                </td>
              </tr>
              <tr>
                <th>비고</th>
                <td>
                  <AntdTextarea
                    rows={3}
                    style={{ width: '100%' }}
                    placeholder="비고"
                    defaultValue={defaultForm.COMMENTS || ''}
                    allowClear
                    onChange={e => this.changeFormData('COMMENTS', e.target.value)}
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
const DrugForm = ({ defaultForm, type, modalVisible, workAreaList, getList }) => (
  <BizMicroDevBase
    sagaKey="DrugForm"
    defaultForm={defaultForm}
    type={type}
    modalVisible={modalVisible}
    workAreaList={workAreaList}
    component={Comp}
    getList={getList}
  ></BizMicroDevBase>
);

DrugForm.propTypes = {
  defaultForm: PropTypes.object,
  type: PropTypes.string,
  modalVisible: PropTypes.func,
  workAreaList: PropTypes.array,
  getList: PropTypes.func,
};

DrugForm.defaultProps = {
  defaultForm: {},
  type: 'INPUT',
  modalVisible: () => {},
  workAreaList: [],
  getList: () => {},
};

Comp.propTypes = {
  defaultForm: PropTypes.object,
  type: PropTypes.string,
  modalVisible: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  workAreaList: PropTypes.array,
  sagaKey: PropTypes.string,
  getList: PropTypes.func,
};

Comp.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  submitHandlerBySaga: () => {},
  modalVisible: () => {},
  workAreaList: [],
  sagaKey: '',
  getList: () => {},
};

export default DrugForm;
