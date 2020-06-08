import React, { Component } from 'react';
import { Table, Input, Modal, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import UserSearchModal from 'apps/eshs/common/userSearchModal';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  state = {
    list: [],
    yearList: [],
    workAreaList: [],
    deptList: [],
    searchInfo: {
      CHK_TYPE_CD: '001',         // 일반검진-CODE:001
      CHK_TYPE_CD_NODE_ID: 2064,  // 일반검진-NODE_ID:2064
      CHK_YEAR: '',
      WORK_AREA_CD_NODE_ID: '',
      SCH_USER_ID: '',
      EMP_NO: '',
      USER_NAME: '',
    }
  };

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i=currYear; i>=1998; i--) {
      yearList.push(i);
    }
    this.setState(prevState => {
      let { searchInfo } = prevState;
      searchInfo.CHK_YEAR = currYear.toString();
      return {
        yearList,
        searchInfo,
      }
    });
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'workAreaList',
        url: `/api/admin/v1/common/categoryMap?MAP_ID=45`,
        type: 'GET',
        params: {},
      }
    ];
    getCallDataHandler(sagaKey, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    if (result.workAreaList) {
      this.setState({ workAreaList: result.workAreaList.categoryMapList });
    }
  };

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'targetList002',
      url: `/api/eshs/v1/common/health/healthChkTargetList`,
      type: 'POST',
      params: {
        PARAM: {
          ...this.state.searchInfo
        }
      },
    };
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.list) {
        this.setState({
          list: res.list.map((item, idx) => ({
            ...item,
            TRIAL_SEQ: `${item.TRIAL_SEQ}차`,
            key: item.CHK_CD,
            RNUM: res.list.length - idx,
          }))
        });
      }
      spinningOff();
    });
  };

  onCreateTargetSelection = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.searchInfo
      }
    };
    Modal.confirm({
      title: `${this.state.searchInfo.CHK_YEAR}년도 일반검진 대상자 목록을 생성하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      okText: '생성',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthChkTargetSelection', submitData, (id, res) => {
          if (res && res.result > 0) {
            message.info(<MessageContent>대상자 목록을 생성하였습니다.</MessageContent>)
          } else {
            message.info(<MessageContent>대상자 목록 생성에 실패하였습니다.</MessageContent>)
          }
          spinningOff();
        });
      },
    })
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  onClickRow = row => {
    console.debug('row > ', row);
  };

  onUserSearchAfter = row => {
    if (row) {
      this.onChangeSearchInfo('SCH_USER_ID', row.USER_ID);
      this.onChangeSearchInfo('EMP_NO', row.EMP_NO);
    }
  };

  columns = [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'RNUM',
      align: 'center',
      width: '5%',
    },
    {
      title: '이름',
      dataIndex: 'USER_NAME',
      key: 'USER_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      align: 'center',
      width: '10%',
    },
    {
      title: '근무지',
      dataIndex: 'WORK_AREA_NAME',
      key: 'WORK_AREA_NAME',
      width: '10%',
      align: 'center',
    },
    {
      title: '부서',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
      align: 'center',
      width: '20%',
    },
    {
      title: '검진차수',
      dataIndex: 'TRIAL_SEQ',
      key: 'TRIAL_SEQ',
      align: 'center',
      width: '7%',
    },
    {
      title: '비고',
      dataIndex: 'BIGO',
      key: 'BIGO',
      align: 'center',
    },
  ];

  render() {
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdSelect
                className="select-sm mr5"
                placeholder="지역선택" allowClear
                style={{ width: 120 }}
                onChange={val => this.onChangeSearchInfo('WORK_AREA_CD_NODE_ID', val)}
              >
                {this.state.workAreaList.filter(item => item.LVL !== 0).map(item => (
                  <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect defaultValue={this.state.searchInfo.CHK_YEAR} className="select-sm mr5" placeholder="년도" style={{ width: 100 }}>
                {this.state.yearList.map(year => (
                  <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <UserSearchModal onClickRow={this.onUserSearchAfter} />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5">등록</StyledButton>
            <StyledButton className="btn-primary btn-sm" onClick={this.onCreateTargetSelection}>대상자 목록 생성</StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list}
            bordered={true}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              }
            })}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;