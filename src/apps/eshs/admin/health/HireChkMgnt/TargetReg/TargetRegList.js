import React, { Component } from 'react';
import { Table, Modal, Select, DatePicker, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import RegForm from './RegForm';
import View from './View';

const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const AntdInput = StyledInput(Input);

class TargetRegList extends Component {
  state = {
    isShow: false,
    isViewShow: false,
    selectedRowKeys: [],
    selectedRow: {},
    searchInfo: {
      WORK_AREA_CD_NODE_ID: 0,
      FROM_DT: '',
      TO_DT: '',
      IS_PRECHK: '',
      HIRE_GROUP_CD_NODE_ID: 0,
      IS_GOOD: '',
      CHK_SEQ: '',
      STATUS: '',
      NAME: '',
    }
  };

  componentWillMount() {
    const today = new Date();
    
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo.TO_DT = moment(today).format('YYYY-MM-DD');
      today.setMonth(today.getMonth() - 1);
      searchInfo.FROM_DT = moment(today).format('YYYY-MM-DD');
      return { searchInfo }
    });
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 235 }
        },
      },
      {
        key: 'hireGroupList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 688 }
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
        key: 'hireChkList',
        url: '/api/eshs/v1/common/health/helathHireChkList',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  onChangeRangeDatePicker = (val1, val2) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo.FROM_DT = val2[0];
      searchInfo.TO_DT = val2[1];
      return { searchInfo }
    });
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  onDelete = () => {
    if (this.state.selectedRowKeys.length === 0) {
      message.info(<MessageContent>삭제할 대상을 선택해주세요.</MessageContent>);
      return false;
    }

    const submitData = {
      PARAM: {
        delList: this.state.selectedRowKeys.map(item => {
          const arr = item.split('^');
          const obj = {
            COMP_CD: arr[0],
            SSN: arr[1],
            CHK_SEQ: arr[2],
          };
          return obj
        }),
      }
    }

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const callBackFuck = this.getList;

    Modal.confirm({
      title: '삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '삭제',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'DELETE', `/api/eshs/v1/common/health/helathHireChk`, submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            message.info(<MessageContent>삭제하였습니다.</MessageContent>);
            callBackFuck();
          } else {
            message.info(<MessageContent>삭제에 실패하였습니다..</MessageContent>);
          }
        });
      }
    });
  };

  onClickCheckbox = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onClickRow = row => {
    this.setState({
      selectedRow: row,
      isViewShow: true,
    });
  };

  onOpenPopup = () => {
    this.setState({ isShow: true });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false });
  };

  onCancelViewPopup = () => {
    this.setState({ isViewShow: false });
  };

  columns = [
    {
      title: '이름',
      dataIndex: 'NAME',
      key: 'NAME',
      width: '7%',
      align: 'center',
    },
    {
      title: '주민번호',
      dataIndex: 'SSN',
      key: 'SSN',
      width: '12%',
      align: 'center',
    },
    {
      title: '검진기관',
      dataIndex: 'HOSPITAL_NAME',
      key: 'HOSPITAL_NAME',
      width: '10%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '검진(예약)일',
      dataIndex: 'APP_DT',
      key: 'APP_DT',
      width: '10%',
      align: 'center',
      render: text => text ? moment(text).format('YYYY-MM-DD') : text,
    },
    {
      title: '검진구분',
      dataIndex: 'IS_PRECHK',
      key: 'IS_PRECHK',
      width: '7%',
      align: 'center',
      render: text => text === '0' ? '채용' : '배치전',
    },
    {
      title: '검진결과',
      dataIndex: 'DISEASE_CD_NODE_ID',
      key: 'DISEASE_CD_NODE_ID',
      width: '15%',
      ellipsis: true,
      render: (text, record) => text && (`${record.DISEASE_NAME} ${text}(${record.DECISION_LETTER})등급`),
    },
    {
      title: '차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      width: '8%',
      align: 'center',
      render: text => text === '1' ? '1차' : '재검',
    },
    {
      title: '조치사항',
      dataIndex: 'MEASURE',
      key: 'MEASURE',
      ellipsis: true,
    },
    {
      title: '직군',
      dataIndex: 'HIRE_GROUP_NAME',
      key: 'HIRE_GROUP_NAME',
      width: '7%',
      align: 'center',
    },
    {
      title: '근무지',
      dataIndex: 'WORK_AREA_NAME',
      key: 'WORK_AREA_NAME',
      width: '7%',
      align: 'center',
    },
  ];

  render() {
    const { result } = this.props;
    const { searchInfo, selectedRowKeys, selectedRow } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onClickCheckbox,
    };

    return (
      <>
        <AntdModal
          width={800}
          visible={this.state.isShow}
          title="채용검진 대상자 등록"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <RegForm onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <AntdModal
          width={1000}
          visible={this.state.isViewShow}
          title="채용검진 대상자 상세"
          onCancel={this.onCancelViewPopup}
          destroyOnClose
          footer={null}
        >
          <View onCancelPopup={this.onCancelViewPopup} selectedRow={selectedRow} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect className="select-sm mr5" allowClear placeholder="지역" style={{ width: 110 }} onChange={val => this.onChangeSearchInfo('WORK_AREA_CD_NODE_ID', val)}>
              {result && result.workAreaList && result.workAreaList.categoryMapList && (
                result.workAreaList.categoryMapList.filter(cate => cate.LVL === 1).map(cate => (
                  <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                ))
              )}
              </AntdSelect>
              <AntdRangeDatePicker defaultValue={[moment(searchInfo.FROM_DT), moment(searchInfo.TO_DT)]} className="ant-picker-sm mr5" format="YYYY-MM-DD" style={{ width: 325 }} onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)} />
              <AntdSelect className="select-sm mr5" allowClear placeholder="검진구분" style={{ width: 120 }} onChange={val => this.onChangeSearchInfo('IS_PRECHK', val)}>
                <AntdSelect.Option value="0">채용</AntdSelect.Option>
                <AntdSelect.Option value="1">배치전</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect className="select-sm mr5" allowClear placeholder="직군" style={{ width: 110 }} onChange={val => this.onChangeSearchInfo('HIRE_GROUP_CD_NODE_ID', val)}>
              {result && result.hireGroupList && result.hireGroupList.categoryMapList && (
                result.hireGroupList.categoryMapList.filter(cate => cate.LVL === 3).map(cate => (
                  <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                ))
              )}
              </AntdSelect>
              <AntdSelect className="select-sm mr5" allowClear placeholder="결과" style={{ width: 110 }} onChange={val => this.onChangeSearchInfo('IS_GOOD', val)}>
                <AntdSelect.Option value="0">부적합</AntdSelect.Option>
                <AntdSelect.Option value="1">적합</AntdSelect.Option>
                <AntdSelect.Option value="2">미검진</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect className="select-sm mr5" allowClear placeholder="차수" style={{ width: 100 }} onChange={val => this.onChangeSearchInfo('CHK_SEQ', val)}>
                <AntdSelect.Option value="1">1차</AntdSelect.Option>
                <AntdSelect.Option value="2">재검</AntdSelect.Option>
              </AntdSelect> 
            </div>
            <div className="search-input-area">
              <AntdSelect className="select-sm mr5" allowClear placeholder="상태" style={{ width: 110 }} onChange={val => this.onChangeSearchInfo('STATUS', val)}>
                <AntdSelect.Option value="0">작성중</AntdSelect.Option>
                <AntdSelect.Option value="1">의뢰중</AntdSelect.Option>
                <AntdSelect.Option value="2">검진완료</AntdSelect.Option>
              </AntdSelect>
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="이름" style={{ width: 100 }}
                onChange={e => this.onChangeSearchInfo('NAME', e.target.value)}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5" onClick={this.onDelete}>삭제</StyledButton>
            <StyledButton className="btn-primary btn-sm" onClick={this.onOpenPopup}>대상자 등록</StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={result && result.hireChkList && result.hireChkList.list ? result.hireChkList.list.map(item => ({ ...item, key: `${item.COMP_CD}^${item.SSN}^${item.CHK_SEQ}` })) : []}
            bordered
            rowSelection={rowSelection}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              }
            })}
          />
        </StyledContentsWrapper>
      </>
    )
  }
}

export default TargetRegList;