import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import moment from 'moment';
import UserSearchModal from 'apps/eshs/common/userSearchModal';
import ChkMstDetail from 'apps/eshs/admin/health/common/ChkMstDetail';

const AntdTable = StyledAntdTable(Table)
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  state = {
    isChkMstDetailShow: false,
    selectedRow: {},
    searchParam: {
      CHK_YEAR: '',
      HOSPITAL_CODE: '',
      CHK_TYPE_CD_NODE_ID: 0,
      CHK_SEQ: '',
      IS_MATE: '',
      EMP_NO: '',
      SCH_USER_ID: '',
    },
    list: [],
    yearList: [],
  };

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i=currYear; i>=1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList });

    this.onChangeSearchParam('CHK_YEAR', currYear);
    this.getInitData();
  };

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
    spinningOff();
  };

  getList = () => {
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

  onUserSearchAfter = row => {
    if (row) {
      this.onChangeSearchParam('SCH_USER_ID', row.USER_ID);
      this.onChangeSearchParam('EMP_NO', row.EMP_NO);
    }
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam }
    });
  };

  onChkMstDetailPopup = row => {
    this.setState({
      selectedRow: row,
      isChkMstDetailShow: true,
    });
  }

  onCancelChkMstDetailPopup = () => {
    this.setState({ isChkMstDetailShow: false });
  };

  columns = [
    {
      title: '소속',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      width: '10%',
      align: 'center',
      render: (text, record) => <StyledButton className="btn-link btn-sm" onClick={() => this.onChkMstDetailPopup(record)}>{text}</StyledButton>
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
      width: '7%',
      align: 'center',
    },
    {
      title: '차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '7%',
      align: 'center',
      render: text => `${text}차`,
    },
    {
      title: '배우자',
      dataIndex: 'FAM_NAME',
      key: 'FAM_NAME',
      width: '8%',
      align: 'center',
      render: (text, record) => record.IS_MATE === '1' ? text : ''
    },
    {
      title: '검진기관',
      dataIndex: 'HOSPITAL_NAME',
      key: 'HOSPITAL_NAME',
      width: '13%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '예약일',
      dataIndex: 'APP_DT',
      key: 'APP_DT',
      width: '10%',
      align: 'center',
      render: text => text ? moment(text).format('YYYY-MM-DD') : ''
    },
    {
      title: '검진항목',
      dataIndex: 'CHK_ITEMS',
      key: 'CHK_ITEMS',
      ellipsis: true,
    },
  ]

  render() {
    const { result } = this.props;

    return (
      <>
        <AntdModal
          width={850}
          visible={this.state.isChkMstDetailShow}
          title="대상자 개인관리"
          onCancel={this.onCancelChkMstDetailPopup}
          destroyOnClose
          footer={null}
        >
          <ChkMstDetail onCancelPopup={this.onCancelChkMstDetailPopup} selectedRow={this.state.selectedRow} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdSelect
                value={this.state.searchParam.CHK_YEAR} className="select-sm mr5" style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
              {this.state.yearList && this.state.yearList.map(year => (
                <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
              ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5" style={{ width: 200 }} allowClear placeholder="검진기관"
                onChange={val => this.onChangeSearchParam('HOSPITAL_CODE', val)}
              >
              {result.hospitalList && result.hospitalList.list && result.hospitalList.list.map(item => (
                <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
              ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5" style={{ width: 100 }} allowClear placeholder="검종"
                onChange={val => this.onChangeSearchParam('CHK_TYPE_CD_NODE_ID', val)}
              >
              {result.chkTypeList && result.chkTypeList.categoryMapList && result.chkTypeList.categoryMapList.filter(item => item.LVL === 3).map(item => (
                <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
              ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5" style={{ width: 120 }} allowClear placeholder="검진차수"
                onChange={val => this.onChangeSearchParam('CHK_SEQ', val)}
              >
                <AntdSelect.Option value="1">1차</AntdSelect.Option>
                <AntdSelect.Option value="2">재검</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5" style={{ width: 110 }} allowClear placeholder="검진자"
                onChange={val => this.onChangeSearchParam('IS_MATE', val)}
              >
                <AntdSelect.Option value="0">본인</AntdSelect.Option>
                <AntdSelect.Option value="1">배우자</AntdSelect.Option>
              </AntdSelect>
              <UserSearchModal onClickRow={this.onUserSearchAfter} />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list}
            bordered={true}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;