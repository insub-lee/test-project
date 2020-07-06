import React, { Component } from 'react';
import { Table, Input, DatePicker, Modal } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import View from './View';
import ChkResultUpload from './ChkResultUpload';

const AntdTable = StyledAntdTable(Table)
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

class List extends Component {
  state = {
    isShow: false,
    isExcelUploadShow: false,
    selectedRow: {},
    list: [],
    searchInfo: {
      FROM_DT: '',
      TO_DT: '',
      USER_NAME: '',
      IS_MATE: '0',
      SCH_DT_GB: 'CHK_DT',
    }
  }

  componentWillMount() {
    this.setState({
      searchInfo : {
        ...this.state.searchInfo,
        FROM_DT: moment().add(-1, 'months').format('YYYY-MM-DD'),
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
      url: `/api/eshs/v1/common/MhrsHealthChkReservationList`,
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

  onClickDetailView = record => {
    this.setState({
      selectedRow: record,
      isShow: true,
    });
  };

  onRegistChkResult = () => {
    this.setState({ isExcelUploadShow: true });
  };

  onCancelPopup = () => {
    this.setState({
      isShow: false,
      isExcelUploadShow: false,
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
      width: '12%',
      align: 'center',
      render: (text, record) => record.IS_MATE === '0' ? text : `${record.FAM_NAME}(배)`
    },
    {
      title: '주민등록번호',
      dataIndex: 'REGNO',
      key: 'REGNO',
      width: '20%',
      align: 'center',
      render: (text, record) => {
        if (text) {
          if (record.IS_MATE === '0') {
            return `${text.substring(0, 6)}-${text.substring(6, 13)}`;
          } else {
            return `${record.FAM_REGNO.substring(0, 6)}-${record.FAM_REGNO.substring(6, 13)}`
          }
        } else {
          return '';
        }
      }
    },
    {
      title: '차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '8%',
      align: 'center',
      render: text => text === '1' ? `${text}차` : '재검',
    },
    {
      title: '검진일',
      dataIndex: 'CHK_DT',
      key: 'CHK_DT',
      width: '12%',
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
      title: '검진결과',
      dataIndex: 'CHK_CD',
      key: 'CHK_CD',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-link btn-xs" onClick={() => this.onClickDetailView(record)}>상세보기</StyledButton>
      ),
    },
  ];

  render() {
    return (
      <>
        <AntdModal
          width={900}
          visible={this.state.isShow}
          title="검진결과 상세"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <View onCancelPopup={this.onCancelPopup} selectedRow={this.state.selectedRow} />
        </AntdModal>
        <AntdModal
          width={400}
          visible={this.state.isExcelUploadShow}
          title="검진결과 엑셀 등록"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <ChkResultUpload onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">검진일자</span>
              <AntdRangePicker
                defaultValue={[moment(this.state.searchInfo.FROM_DT), moment(this.state.searchInfo.TO_DT)]}
                className="ant-picker-sm mr5" style={{ width: 220 }} format="YYYY-MM-DD" allowClear={false}
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
          <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm" onClick={this.onRegistChkResult}>검진결과 업로드</StyledButton>
          </StyledButtonWrapper>
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