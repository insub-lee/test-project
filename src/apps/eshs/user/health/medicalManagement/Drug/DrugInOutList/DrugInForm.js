import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, DatePicker, Select, InputNumber, Modal, Popconfirm } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import DrugList from 'apps/eshs/user/health/medicalManagement/Drug/DrugList';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

const today = moment(new Date()).format('YYYY-MM-DD');
const onlyNumber = /^[0-9]*$/;

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      modalObj: {
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount = () => {
    this.appStart();
  };

  appStart = () => {
    const { defaultForm } = this.props;

    this.setState({
      formData: { SITE_NODE_ID: 317, ...defaultForm, POSTING_DT: defaultForm.POSTING_DT ? defaultForm.POSTING_DT : moment(new Date()).format('YYYY-MM-DD') },
    });
  };

  DrugModalVisible = () => {
    const {
      modalObj: { visible },
    } = this.state;

    if (visible) {
      return this.setState({
        modalObj: {
          visible: !visible,
          content: [],
        },
      });
    }
    return this.setState({
      modalObj: {
        visible: !visible,
        content: [<DrugList key="DrugList" customOnRowClick={this.DrugListRowClick} saveBtn={false} />],
        title: '의약품 검색',
      },
    });
  };

  DrugListRowClick = record => {
    this.setState(
      prevState => ({
        formData: { ...prevState.formData, ...record },
      }),
      this.DrugModalVisible,
    );
  };

  changeFormData = (target, value) =>
    this.setState(prevState => ({
      formData: Object.assign(prevState.formData, { [target]: value }),
    }));

  handleAction = type => {
    const { sagaKey, submitHandlerBySaga, profile, modalVisible, getList, spinningOn, spinningOff } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        ...formData,
        EMP_NO: profile.EMP_NO,
        USER_ID: profile.USER_ID,
      },
    };

    switch (type) {
      case 'INPUT':
        spinningOn();
        if (!this.validationChk(formData)) return spinningOff();
        submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/health/eshsHealthMedicineInOut', submitData, (id, res) => {
          spinningOff();
          if (res && res.result === 1) {
            this.showMessage('저장되었습니다.');
            modalVisible();
            return getList();
          }
          this.showMessage('저장에 실패하였습니다.');
          return this.showMessage('입고일을 확인해주십시오.');
        });
        break;
      case 'MODIFY':
        if (!this.validationChk(formData)) return spinningOff();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/eshsHealthMedicineInOutUpdate', submitData, (id, res) => {
          spinningOff();
          if (res && res.result === 1) {
            this.showMessage('수정되었습니다.');
            modalVisible();
            return getList();
          }
          return this.showMessage('수정에 실패하였습니다.');
        });
        break;
      case 'DELETE':
        submitHandlerBySaga(sagaKey, 'DELETE', '/api/eshs/v1/common/health/eshsHealthMedicineInOut', submitData, (id, res) => {
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

  validationChk = formData => {
    const { type } = this.props;
    const postingDt = formData.POSTING_DT || '';
    const qty = formData.QTY || '';
    const drugCd = formData.DRUG_CD || '';

    let isPass = true;
    if (!drugCd) {
      this.showMessage('의약품을 선택해주세요.');
      isPass = false;
    } else if (!postingDt) {
      this.showMessage('입고 날짜를 입력해 주세요.');
      isPass = false;
    } else if (type === 'INPUT' && postingDt > today) {
      this.showMessage(`${postingDt}은 입력할 수 없습니다.`);
      isPass = false;
    } else if (!qty || qty === 0) {
      this.showMessage('수량을 입력해 주세요.');
      isPass = false;
    }
    return isPass;
  };

  render() {
    const { type, modalVisible, workAreaList } = this.props;
    const { formData, modalObj } = this.state;
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
                <th colSpan={2}>구급약품 입고{type === 'INPUT' ? '등록' : '관리'}</th>
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
                    value={formData.SITE_NODE_ID || 317}
                    placeholder="지역"
                    onChange={val => this.changeFormData('SITE_NODE_ID', val)}
                    disabled={type !== 'INPUT'}
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
                  {type === 'INPUT' ? (
                    <AntdSearchInput
                      style={{ width: '100%' }}
                      value={formData.DRUG}
                      className="input-search-sm ant-search-inline mr5"
                      placeholder="의약품 검색"
                      onClick={this.DrugModalVisible}
                      onChange={this.DrugModalVisible}
                    />
                  ) : (
                    <AntdInput
                      placeholder="품목"
                      allowClear
                      className="ant-input-sm ant-input-inline mr5"
                      value={formData.DRUG || ''}
                      style={{ width: '100%' }}
                      readOnly
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th>제약회사</th>
                <td>
                  <AntdInput
                    placeholder="제약회사"
                    allowClear
                    readOnly
                    className="ant-input-sm ant-input-inline mr5"
                    value={formData.COMPANY || ''}
                    style={{ width: '100%' }}
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
                    value={formData.SIZE1 || ''}
                    style={{ width: '100%' }}
                    readOnly
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
                    value={formData.UNIT || ''}
                    style={{ width: '100%' }}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <th>{formData.IN_OUT_TYPE === '출고' ? '출고일' : '입고일'}</th>
                <td>
                  <AntdDatePicker
                    className="ant-picker-sm mr5"
                    style={{ width: '100%' }}
                    placeholder="입고일"
                    disabled={type !== 'INPUT'}
                    value={formData.POSTING_DT ? moment(formData.POSTING_DT) : moment(new Date())}
                    onChange={(val, strVal) => this.changeFormData('POSTING_DT', strVal)}
                  />
                </td>
              </tr>
              <tr>
                <th>수량</th>
                <td>
                  <AntdInputNumber
                    className="ant-input-number-sm"
                    style={{ width: '100%' }}
                    value={formData.QTY || 0}
                    onChange={value => {
                      if (onlyNumber.test(value)) return this.changeFormData('QTY', value);
                      return this.showMessage('숫자만 입력할 수 있습니다.');
                    }}
                    name="gasWeight"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          width={900}
          visible={modalObj.visible}
          title={modalObj.title}
          onCancel={this.DrugModalVisible}
          destroyOnClose
          footer={[
            <StyledButton className="btn-light" onClick={this.DrugModalVisible}>
              닫기
            </StyledButton>,
          ]}
        >
          {modalObj.content}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

const DuugInForm = ({ defaultForm, type, workAreaList, modalVisible, getList }) => (
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

DuugInForm.propTypes = {
  defaultForm: PropTypes.object,
  type: PropTypes.string,
  modalVisible: PropTypes.func,
  getList: PropTypes.func,
  workAreaList: PropTypes.array,
};

DuugInForm.defaultProps = {
  defaultForm: {},
  type: 'INPUT',
  modalVisible: () => {},
  getList: () => {},
  workAreaList: [],
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
  profile: PropTypes.object,
};

Comp.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  submitHandlerBySaga: () => {},
  modalVisible: () => {},
  workAreaList: [],
  sagaKey: '',
  getList: () => {},
  profile: {},
};

export default DuugInForm;
