import React, { Component } from 'react';
import { Table, Input, Modal, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModalPad(Modal);

class List extends Component {
  state = {
    list: [],
    yearList: [],
    workAreaList: [],
    deptList: [],
    searchInfo: {
      CHK_TYPE_CD: '002',  //고정(종합검진)
      CHK_YEAR: '',
      WORK_AREA_CD: '',
      EMP_NO: '',
      USER_NAME: '',
    }
  };

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i=2020; i>=1998; i--) {
      yearList.push(i);
    }
    this.setState(prevState => {
      let { searchInfo } = prevState;
      searchInfo.CHK_YEAR = currYear;
      return {
        yearList,
        searchInfo,
      }
    });
  }

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
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
    });
  }

  onCreateTargetSelection = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const submitData = {
      PARAM: {
        CHK_TYPE_CD: '002',
      }
    }
    Modal.confirm({
      title: `대상자 목록을 생성하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthChkTargetSelection', submitData, (id, res) => {
          console.debug('res >> ', res);
          if (res && res.result > 0) {
            message.info(<MessageContent>대상자 목록을 생성하였습니다.</MessageContent>)
          } else {
            message.info(<MessageContent>대상자 목록 생성에 실패하였습니다.</MessageContent>)
          }
        });
      },
    })
  }

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
          <div className="selSaveWrapper alignLeft">
            <AntdSelect
              className="select-sm mr5"
              placeholder="지역선택"
              style={{ width: 120 }}
              onChange={val => this.onChangeSearchInfo('WORK_AREA_CD', val)}
            >
              <AntdSelect.Option value="">지역전체</AntdSelect.Option>
              <AntdSelect.Option value="C1">청주</AntdSelect.Option>
              <AntdSelect.Option value="H3">구미</AntdSelect.Option>
              <AntdSelect.Option value="A6">서울</AntdSelect.Option>
              <AntdSelect.Option value="Z3">해외</AntdSelect.Option>
            </AntdSelect>
            <AntdSelect defaultValue={this.state.searchInfo.CHK_YEAR} className="select-sm mr5" placeholder="년도" style={{ width: 100 }}>
              {this.state.yearList.map(year => (
                <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
              ))}
            </AntdSelect>
            <span className="textLabel">사번</span>
            <AntdInput
              className="ant-input-sm ant-input-inline mr5"
              style={{ width: 150 }}
              onChange={e => this.onChangeSearchInfo('EMP_NO', e.target.value)}
              onPressEnter={this.getList}
              allowClear
            />
            <span className="textLabel">이름</span>
            <AntdInput
              className="ant-input-sm ant-input-inline mr5"
              style={{ width: 150 }}
              onChange={e => this.onChangeSearchInfo('USER_NAME', e.target.value)}
              onPressEnter={this.getList}
              allowClear
            />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </StyledButtonWrapper>
          </div>
          <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mt-20 btn-wrap-ml-5">
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