/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select, Input, DatePicker, Table, Popconfirm } from 'antd';
import moment from 'moment';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import BizMicroDevBase from 'components/BizMicroDevBase';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);

const { Option } = Select;

const format = 'YYYY-MM-DD HH:mm:ss';

moment.locale('ko');

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endOpen: false,
      formData: {},
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff, type, initData } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'NothGateCmpnyList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsNothGateCmpny',
      },
    ];
    return this.setState(
      {
        startValue: null,
        endValue: null,
        endOpen: false,
        formData:
          JSON.stringify(initData) === '{}'
            ? {
                WORK_AREA_CD: 'CJ',
                VISITOR_TYPE: 'N',
                VISITOR_IN_DATE: moment().format(format),
                VISITOR_OUT_DATE: moment().format(format),
              }
            : { ...initData },
      },
      type === 'INSERT' ? () => getCallDataHandler(id, apiAry, spinningOff) : spinningOff(),
    );
  };

  handleBtnOnClick = () => {
    const is_ok = this.validationCheck();
    if (is_ok) {
      const { sagaKey: id, submitHandlerBySaga, modalVisible, type, saveAfter } = this.props;
      const { formData } = this.state;
      if (type === 'INSERT') {
        // const submitData = (formData && formData.modal && formData.modal.info) || {};
        // changeFormData(id, 'actionType', 'INSERT');
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsNothGateCmpny', formData, (afterId, res) => {
          if (res && res.code === 200) {
            message.info(<MessageContent>등록되었습니다.</MessageContent>);
            modalVisible();
            return saveAfter();
          }
          return message.info(<MessageContent>등록에 실패하였습니다.</MessageContent>);
        });
      } else if (type === 'UPDATE') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsNothGateCmpny', formData, (afterId, res) => {
          if (res && res.code === 200) {
            message.info(<MessageContent>수정되었습니다.</MessageContent>);
            modalVisible();
            return saveAfter();
          }
          return message.info(<MessageContent>수정에 실패하였습니다.</MessageContent>);
        });
      } else return false;
    }
    return false;
  };

  handleChangeFormData = (target, value) => {
    this.setState(prevState => ({
      formData: Object.assign(prevState.formData, { [target]: value }),
    }));
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  handleDeleteBtn = () => {
    const { sagaKey: id, submitHandlerBySaga, modalVisible, saveAfter } = this.props;
    const { formData } = this.state;
    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsNothGateCmpny', formData, (afterId, res) => {
      if (res && res.code === 200) {
        message.info(<MessageContent>삭제되었습니다.</MessageContent>);
        modalVisible();
        return saveAfter();
      }
      return message.info(<MessageContent>삭제에 실패하였습니다.</MessageContent>);
    });
  };

  businessNumberCheck = () => {
    let sum = 0;
    const nArray = new Array(10);
    const chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');

    const { formData } = this.state;
    const BIZ_REG_NO = (formData && formData.BIZ_REG_NO) || '';
    if (BIZ_REG_NO) {
      const bNum = BIZ_REG_NO.replace(/-/gi, '');
      for (let i = 0; i < 10; i++) {
        nArray[i] = bNum.substring(i, i + 1);
      }
      for (let i = 0; i < 9; i++) {
        sum += nArray[i] * chkvalue[i];
      }
      sum += parseInt((nArray[8] * 5) / 10);
      const sidliy = sum % 10;
      let sidchk = 0;
      if (sidliy != 0) {
        sidchk = 10 - sidliy;
      } else {
        sidchk = 0;
      }
      if (sidchk != nArray[9]) {
        message.info(<MessageContent>사업자번호를 정확히 입력해주세요.</MessageContent>);
        return false;
      }
      return true;
    }
    message.info(<MessageContent>사업자번호를 정확히 입력해주세요.</MessageContent>);

    return false;
  };

  validationCheck = () => {
    const { formData } = this.state;
    const WRK_CMPNY_NM = (formData && formData.WRK_CMPNY_NM) || '';
    const VISITOR_NAME = (formData && formData.VISITOR_NAME) || '';
    const BIZ_REG_NO = (formData && formData.BIZ_REG_NO) || '';

    if (BIZ_REG_NO === '000-00-00000') {
      if (!WRK_CMPNY_NM) {
        message.info(<MessageContent>업체명을 직접 입력해 주세요.</MessageContent>);

        return false;
      }
    }
    if (!WRK_CMPNY_NM) {
      message.info(<MessageContent>방문업체를 선택해 주세요.</MessageContent>);

      return false;
    }
    if (!VISITOR_NAME) {
      message.info(<MessageContent>방문자 성함을 입력해 주세요.</MessageContent>);

      return false;
    }
    if (!this.businessNumberCheck()) {
      return false;
    }
    return true;
  };

  getColumnSearchProps = (dataIndex, plac) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={plac}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <StyledButton
          type="primary"
          className="btn-gray btn-sm"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          style={{ width: 90, marginRight: 8 }}
        >
          검색
        </StyledButton>
        <StyledButton className="btn-light btn-sm" onClick={() => this.handleReset(clearFilters)} style={{ width: 90 }}>
          Reset
        </StyledButton>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  columns = [
    { title: '사업자등록번호', dataIndex: 'BIZ_REG_NO', width: '20%', align: 'center', ...this.getColumnSearchProps('BIZ_REG_NO', '사업자등록번호') },
    { title: '업체명', dataIndex: 'WRK_CMPNY_NM', width: '30%', align: 'center', ...this.getColumnSearchProps('WRK_CMPNY_NM', '업체명') },
    { title: '사업장주소', dataIndex: 'ADDRESS', width: '50%', align: 'center', ...this.getColumnSearchProps('ADDRESS', '사업장주소') },
  ];

  render() {
    const { endOpen, formData } = this.state;
    const { type, modalVisible, result } = this.props;
    const nothGateCmpnyList = (result && result.NothGateCmpnyList && result.NothGateCmpnyList.List) || [];

    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
            <tbody>
              <tr>
                <th>지역</th>
                <td colSpan="3">
                  <AntdSelect
                    defaultValue="CJ"
                    style={{ width: '30%' }}
                    onChange={value => this.handleChangeFormData('WORK_AREA_CD', value)}
                    className="select-sm mr5"
                  >
                    <Option value="CJ">청주</Option>
                    <Option value="GM">구미</Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>업체명</th>
                <td>
                  <AntdInput
                    placeholder="업체명"
                    className="ant-input-sm"
                    value={formData.WRK_CMPNY_NM}
                    style={{ width: '100%' }}
                    onChange={e => this.handleChangeFormData('WRK_CMPNY_NM', e.target.value)}
                    readOnly={formData.BIZ_REG_NO !== '000-00-00000'}
                  />
                </td>
                <th>사업자등록번호</th>
                <td>
                  <AntdInput
                    placeholder="사업자등록번호"
                    className="ant-input-sm"
                    style={{ width: '100%' }}
                    name="BIZ_REG_NO"
                    value={formData.BIZ_REG_NO}
                    onChange={e => {
                      const bspt = /^[0-9 \-]+$/;
                      if (bspt.test(e.target.value)) {
                        return this.handleChangeFormData('BIZ_REG_NO', e.target.value);
                      }
                      return null;
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>방문자 성명</th>
                <td>
                  <AntdInput
                    placeholder="방문자 성명"
                    className="ant-input-sm"
                    style={{ width: '100%' }}
                    name="VISITOR_NAME"
                    value={formData.VISITOR_NAME}
                    onChange={e => this.handleChangeFormData('VISITOR_NAME', e.target.value)}
                  />
                </td>
                <th>연락처</th>
                <td>
                  <AntdInput
                    placeholder="연락처"
                    className="ant-input-sm"
                    style={{ width: '100%' }}
                    name="PHONE_NUMBER"
                    value={formData.PHONE_NUMBER}
                    onChange={e => this.handleChangeFormData('PHONE_NUMBER', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>출입시간</th>
                <td>
                  <AntdDatePicker
                    style={{ width: '100%' }}
                    disabledDate={this.disabledStartDate}
                    className="ant-picker-sm"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={moment(formData.VISITOR_IN_DATE)}
                    placeholder="Start"
                    onChange={value => this.setState({ startValue: value }, () => this.handleChangeFormData('VISITOR_IN_DATE', moment(value).format(format)))}
                    onOpenChange={this.handleStartOpenChange}
                  />
                </td>
                <th>퇴장시간</th>
                <td>
                  <AntdDatePicker
                    disabledDate={this.disabledEndDate}
                    className="ant-picker-sm"
                    showTime
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={moment(formData.VISITOR_OUT_DATE)}
                    placeholder="End"
                    onChange={value => this.setState({ endValue: value }, () => this.handleChangeFormData('VISITOR_OUT_DATE', moment(value).format(format)))}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20 btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm  btn-first" onClick={this.handleBtnOnClick}>
              {type === 'INSERT' ? '등록' : '수정'}
            </StyledButton>
            {type !== 'INSERT' && (
              <Popconfirm title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?" onConfirm={this.handleDeleteBtn} okText="확인" cancelText="취소">
                <StyledButton className="btn-sm btn-light btn-first">삭제</StyledButton>
              </Popconfirm>
            )}
            <StyledButton className="btn-sm btn-light" onClick={modalVisible}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        {type === 'INSERT' && (
          <>
            <AntdTable
              rowKey="TASK_SEQ"
              columns={this.columns}
              onRow={(record, rowIndex) => ({
                onClick: () => this.setState(prevState => ({ formData: { ...prevState.formData, ...record } })),
              })}
              dataSource={nothGateCmpnyList || []}
              bordered
            />
          </>
        )}
      </StyledContentsWrapper>
    );
  }
}

const NothGateCmpnyModal = ({ type, initData, modalVisible, saveAfter }) => (
  <BizMicroDevBase
    type={type}
    initData={initData}
    modalVisible={modalVisible}
    saveAfter={saveAfter}
    sagaKey="NothGateCmpnyModal"
    component={Comp}
  ></BizMicroDevBase>
);
NothGateCmpnyModal.propTypes = {
  type: PropTypes.string,
  initData: PropTypes.object,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.func,
};

Comp.propTypes = {
  type: PropTypes.string,
  initData: PropTypes.object,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  modalVisible: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  saveAfter: PropTypes.func,
};

Comp.defaultProps = {
  type: '',
  initData: {},
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  modalVisible: () => {},
  submitHandlerBySaga: () => {},
  saveAfter: () => {},
};
export default NothGateCmpnyModal;
