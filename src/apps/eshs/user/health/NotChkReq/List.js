import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import NotChkReg from 'apps/eshs/common/health/NotChkReg';
import NotChkReason from 'apps/eshs/common/health/NotChkReason';

const AntdTable = StyledAntdTable(Table)
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  state = {
    isShow: false,      // 미검진신청 Modal visible
    isReasonShow: false,// 미검진 신청이력 Modal visible
    selectedRow: {},
    yearList: [],
    list: [],
    searchParam: {
      CHK_YEAR: '',
    }
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
    this.getList();
  };

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff, profile } = this.props;
    const apiInfo = {
      key: 'chkMstList',
      url: `/api/eshs/v1/common/health/healthNChkList`,
      type: 'POST',
      params: {
        PARAM: {
          ...this.state.searchParam,
          SCH_USER_ID: profile.USER_ID,
        },
      },
    }
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
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
      title: '검진종류',
      dataIndex: 'CHK_TYPE_CD_NAME',
      key: 'CHK_TYPE_CD_NAME',
      width: '20%',
      align: 'center',
    },
    {
      title: '시행차수',
      dataIndex: 'WORK_AREA_NAME',
      key: 'WORK_AREA_NAME',
      width: '20%',
      align: 'center',
      render: (text, record) => `${text}${record.TRIAL_SEQ}`,
    },
    {
      title: '검진차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '20%',
      align: 'center',
      render: text => text === '1' ? `${text}차` : text === '2' ? '재검' : '상담',
    },
    {
      title: '미검진 신청',
      dataIndex: 'N_CHK_REASON_NAME',
      key: 'N_CHK_REASON_NAME',
      width: '20%',
      align: 'center',
      render: (text, record) => text ? text : <StyledButton className="btn-primary btn-xxs" onClick={() => this.onClickNChkReg(record)}>미검진 신청</StyledButton>,
    },
    {
      title: '조회',
      dataIndex: 'USER_ID',
      key: 'USER_ID',
      width: '20%',
      align: 'center',
      render: (text, record) => <StyledButton className="btn-gray btn-xxs" onClick={() => this.onClickReasonHistory(record)}>조회</StyledButton>,
    },
  ];

  render() {
    const { result, profile } = this.props;

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
              <AntdInput defaultValue={profile.EMP_NO} className="ant-input-sm ant-input-inline mr5" disabled style={{ width: 100 }} />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={result && result.chkMstList && result.chkMstList.list ? result.chkMstList.list.map(item => ({ ...item, key: item.CHK_CD })) : []}
            bordered={true}
          />
        </StyledContentsWrapper>
      </>
    )
  }
}

export default List;