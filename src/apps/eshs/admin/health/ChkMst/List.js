import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdTable = StyledAntdTable(Table)
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdDatePicker= StyledDatePicker(DatePicker);

class List extends Component {
  state = {
    searchParam: {
      DATE_GUBUN: 'APP_DT',
      SEARCH_DATE: '',
      HOSPITAL_CODE: '',
      CHK_TYPE_CD_NODE_ID: 0,
      CHK_SEQ: '',
      IS_MATE: '',
      EMP_NO: '',
    },
    list: [],
  };

  componentWillMount() {
    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm= today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1;
    const yyyy = today.getFullYear();

    this.onChangeSearchParam('SEARCH_DATE', `${yyyy}-${mm}-${dd}`);
    this.getInitData();
  };

  componentDidMount() {};

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOn } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 }
        },
      },
    ];

    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initDate);
  };

  initDate = () => {
    const { result, spinningOff } = this.props;
    if (result && result.hospitalList && result.hospitalList.list) {
      this.onChangeSearchParam('HOSPITAL_CODE', result.hospitalList.list[0].HOSPITAL_CODE);
    }
    spinningOff();
  };

  getList = () => {
    console.debug('## ', this.state.searchParam);
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'chkMstList',
      url: `/api/eshs/v1/common/health/healthChkReservationMstList`,
      type: 'POST',
      params: {
        PARAM: { ...this.state.searchParam },
      },
    }
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.list) {
        this.setState({
          list: res.list,
        });
      }
      spinningOff();
    });
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam }
    });
  };

  columns = [
    {
      title: '소속',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
      width: '20%',
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      width: '8%',
      align: 'center',
    },
    {
      title: '성명',
      dataIndex: 'USER_NAME',
      key: 'USER_NAME',
      width: '8%',
      align: 'center',
    },
    {
      title: '검종',
      dataIndex: 'CHK_TYPE_CD_NAME',
      key: 'CHK_TYPE_CD_NAME',
      width: '8%',
      align: 'center',
    },
    {
      title: '차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '8%',
      align: 'center',
      render: text => `${text}차`,
    },
    {
      title: '배우자',
      dataIndex: 'FAM_NAME',
      key: 'FAM_NAME',
      width: '10%',
      align: 'center',
      render: (text, record) => {
        if (record.IS_MATE === '1') {
          return text;
        }
      }
    },
    {
      title: '검진일',
      dataIndex: 'CHK_DT',
      key: 'CHK_DT',
      width: '10%',
      align: 'center',
      render: text => <AntdDatePicker value={text && text !== '' ? moment(text) : ''} className="ant-picker-sm" />
    },
    {
      title: '병원등록번호',
      dataIndex: 'HOS_REGNO',
      key: 'HOS_REGNO',
      width: '15%',
      align: 'center',
      render: text => <AntdInput value={text} className="ant-input-sm" />
    },
  ]

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledSearchWrapper>
          <div className="row">
            <AntdSelect
              defaultValue={this.state.searchParam.DATE_GUBUN} className="select-sm mr5" style={{ width: 80 }}
              onChange={val => this.onChangeSearchParam('DATE_GUBUN', val)}
            >
              <AntdSelect.Option value="APP_DT">예약일</AntdSelect.Option>
              <AntdSelect.Option value="CHK_DT">검진일</AntdSelect.Option>
            </AntdSelect>
            <AntdDatePicker
              defaultValue={moment(this.state.searchParam.SEARCH_DATE)} className="ant-picker-sm mr5" style={{ width: 110 }}
              onChange={(val1, val2) => this.onChangeSearchParam('SEARCH_DATE', val2)}
            />
            {result.hospitalList && result.hospitalList.list && (
              <AntdSelect
                defaultValue={result.hospitalList.list[0].HOSPITAL_CODE} className="select-sm mr5" style={{ width: 200 }}
                onChange={val => this.onChangeSearchParam('HOSPITAL_CODE', val)}
              >
                {result.hospitalList.list.map(item => (
                  <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                ))}
              </AntdSelect>
            )}
            {result.chkTypeList && result.chkTypeList.categoryMapList && (
              <AntdSelect defaultValue="" className="select-sm mr5" style={{ width: 100 }} onChange={val => this.onChangeSearchParam('CHK_TYPE_CD_NODE_ID', val)}>
                <AntdSelect.Option value="">검종전체</AntdSelect.Option>
                  {result.chkTypeList.categoryMapList.map(item => (
                    <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                  ))}
              </AntdSelect>
            )}
            <AntdSelect defaultValue="" className="select-sm mr5" style={{ width: 120 }} onChange={val => this.onChangeSearchParam('CHK_SEQ', val)}>
              <AntdSelect.Option value="">검진차수전체</AntdSelect.Option>
              <AntdSelect.Option value="1">1차</AntdSelect.Option>
              <AntdSelect.Option value="2">재검</AntdSelect.Option>
            </AntdSelect>
            <AntdSelect defaultValue="" className="select-sm mr5" style={{ width: 110 }} onChange={val => this.onChangeSearchParam('IS_MATE', val)}>
              <AntdSelect.Option value="">검진자전체</AntdSelect.Option>
              <AntdSelect.Option value="0">본인</AntdSelect.Option>
              <AntdSelect.Option value="1">배우자</AntdSelect.Option>
            </AntdSelect>
            <AntdInput placeholder="사번" className="ant-input-sm ant-input-inline mr5" style={{ width: 80 }} onChange={e => this.onChangeSearchParam('EMP_NO', e.target.value)} />
            <StyledButton className="btn-light btn-sm" onClick={this.getList}>검색</StyledButton>
          </div>
        </StyledSearchWrapper>
        <AntdTable
          columns={this.columns}
          dataSource={this.state.list}
          bordered={true}
        />
      </StyledContentsWrapper>
    );
  }
}

export default List;