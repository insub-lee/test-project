import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import ChkMstDetail from 'apps/eshs/admin/health/common/ChkMstDetail';

const AntdTable = StyledAntdTable(Table)
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

class List extends Component {
  state = {
    isChkMstDetailShow: false,
    selectedRow: {},
    searchInfo: {
      HOSPITAL_CODE: '',
      CHK_TYPE_CD_NODE_ID: 2065,  //종합(고정)
      FROM_DT: '',
      TO_DT: '',
      USER_NAME: ''
    },
    list: [],
  };

  componentWillMount() {
    this.setState({
      searchInfo : {
        ...this.state.searchInfo,
        FROM_DT: moment().add(-1, 'days').format('YYYY-MM-DD'),
        TO_DT: moment().format('YYYY-MM-DD'),
      }
    });

    const{ sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'hospitalUser',
      url: `/api/eshs/v1/common/MhrsHospitalUser`,
      type: 'GET',
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.user && res.user.HOSPITAL_CODE) {
        this.setState({
          searchInfo: { ...this.state.searchInfo, HOSPITAL_CODE: res.user.HOSPITAL_CODE }
        }, this.getList);
      }
    });
  };

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'reservationList',
      url: `/api/eshs/v1/common/MhrsHealthChkReservation`,
      type: 'POST',
      params: {
        PARAM: { ...this.state.searchInfo },
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

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  onChangeRangePicker = val => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo.FROM_DT = val[0];
      searchInfo.TO_DT = val[1];
      return { searchInfo }
    });
  };

  columns = [
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
      width: '10%',
      align: 'center',
      render: (text, record) => record.IS_MATE === '0' ? text : `${record.FAM_NAME}(배)`
    },
    {
      title: '주민등록번호',
      dataIndex: 'REGNO',
      key: 'REGNO',
      width: '15%',
      align: 'center',
      render: (text, record) => (
        record.IS_MATE === '0' ? `${text.substring(0, 6)}-${text.substring(6, 13)}` : `${record.FAM_REGNO.substring(0, 6)}-${record.FAM_REGNO.substring(6, 13)}`
      )
    },
    {
      title: '차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '6%',
      align: 'center',
      render: text => text ? `${text}차` : '재검',
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
      title: '전화번호',
      dataIndex: 'MOBILE',
      key: 'MOBILE',
      width: '15%',
      align: 'center',
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
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdRangePicker
                defaultValue={[moment(this.state.searchInfo.FROM_DT), moment(this.state.searchInfo.TO_DT)]}
                className="ant-picker-sm mr5" style={{ width: 220 }} format="YYYY-MM-DD"
                onChange={(val1, val2) => this.onChangeRangePicker(val2)}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="성명" style={{ width: 100 }}
                onChange={e => this.onChangeSearchInfo('USER_NAME', e.target.value)}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list.map(item => ({ ...item, key:item.CHK_CD }))}
            bordered={true}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;