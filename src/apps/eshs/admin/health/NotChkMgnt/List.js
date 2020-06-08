import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined, DownSquareOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import NotChkReg from 'apps/eshs/common/health/NotChkReg';
import NotChkReason from 'apps/eshs/common/health/NotChkReason';

const AntdTable = StyledAntdTable(Table)
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  state = {
    isShow: false,      // 미검진신청 Modal visible
    isReasonShow: false,// 미검진 신청이력 Modal visible
    selectedRow: {},
    yearList: [],
    searchParam: {
      CHK_YEAR: '',
      WORK_AREA_CD_NODE_ID: '',
      CHK_TYPE_CD_NODE_ID: '',
      CHK_SEQ: '',
      SCH_USER_ID: '',
      EMP_NO: '',
    },
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
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 }
        },
      },
      {
        key: 'siteList',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=45',
        type: 'GET',
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
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'nChkList',
        url: '/api/eshs/v1/common/health/healthNChkList',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchParam }
        }
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
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

  onUserSearchAfter = user => {
    if (user) {
      this.onChangeSearchParam('SCH_USER_ID', user.USER_ID);
      this.onChangeSearchParam('EMP_NO', user.EMP_NO);
    }
  };

  onClickNChkReg = row => {
    this.setState({
      selectedRow: row,
      isShow: true,
    });
  };

  onClickReasonHistory = row => {
    this.setState({
      selectedRow: row,
      isReasonShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false });
  };

  onCancelReasonPopup = () => {
    this.setState({ isReasonShow: false });
  };

  columns = [
    {
      title: '소속',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      width: '10%',
      align: 'center'
    },
    {
      title: '이름',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '10%',
      align: 'center'
    },
    {
      title: '검진종류',
      dataIndex: 'CHK_TYPE_CD_NAME',
      key: 'CHK_TYPE_CD_NAME',
      width: '12%',
      align: 'center'
    },
    {
      title: '시행차수',
      dataIndex: 'TRIAL_SEQ',
      key: 'TRIAL_SEQ',
      width: '10%',
      align: 'center',
      render: (text, record) => `${record.WORK_AREA_NAME}${text}`,
    },
    {
      title: '검진차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '10%',
      align: 'center',
      render: text => `${text}차`,
    },
    {
      title: '미검진신청',
      dataIndex: 'N_CHK_REASON_NAME',
      key: 'N_CHK_REASON_NAME',
      width: '15%',
      align: 'center',
      render: (text, record) => record.N_CHK_REASON_CD_NODE_ID ? text : <StyledButton className="btn-primary btn-xxs" onClick={() => this.onClickNChkReg(record)}>신청</StyledButton>,
    },
    {
      title: '조회',
      dataIndex: 'CHK_CD',
      key: 'CHK_CD',
      width: '8%',
      align: 'center',
      render: (text, record) => <StyledButton className="btn-gray btn-xxs" onClick={() => this.onClickReasonHistory(record)}>조회</StyledButton>
    },
  ];

  render() {
    const { result } = this.props;

    return (
      <>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="미검진 신청"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <NotChkReg selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <AntdModal
          width={900}
          visible={this.state.isReasonShow}
          title="연기신청 및 미수검신청 처리 내역"
          onCancel={this.onCancelReasonPopup}
          destroyOnClose
          footer={<StyledButton className="btn-light btn-sm" onClick={this.onCancelReasonPopup}>닫기</StyledButton>}
        >
          <NotChkReason selectedRow={this.state.selectedRow} />
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
                className="select-sm mr5" style={{ width: 100 }} placeholder="지역" allowClear
                onChange={val => this.onChangeSearchParam('WORK_AREA_CD_NODE_ID', val)}
              >
              {result && result.siteList && result.siteList.categoryMapList && result.siteList.categoryMapList.filter(item => item.LVL === 1).map(item => (
                <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
              ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5" style={{ width: 100 }} placeholder="검종" allowClear
                onChange={val => this.onChangeSearchParam('WORK_AREA_CD_NODE_ID', val)}
              >
              {result && result.chkTypeList && result.chkTypeList.categoryMapList && result.chkTypeList.categoryMapList.filter(item => item.LVL === 3).map(item => (
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
              <UserSearchModal onClickRow={this.onUserSearchAfter} />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={result && result.nChkList && result.nChkList.list ? result.nChkList.list.map(item => ({ ...item, key: item.CHK_CD })) : []}
            bordered
          />
        </StyledContentsWrapper>
      </>
    )
  }
}

export default List;