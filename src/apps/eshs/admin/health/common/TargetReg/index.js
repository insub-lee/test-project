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
import ChkMstInput from 'apps/eshs/admin/health/common/ChkMstInput';
import ChkMstDetail from 'apps/eshs/admin/health/common/ChkMstDetail';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

/**
 * 대상자 등록 공통 페이지
 * props: {
 *   chkTypeCd: 검종
 * }
 */
class TargetRegList extends Component {
  state = {
    isChkMstInputShow: false,
    isChkMstDetailShow: false,
    list: [],
    yearList: [],
    workAreaList: [],
    selectedRowKeys: [],
    searchInfo: {
      CHK_TYPE_CD: '',          // 검종코드값
      CHK_TYPE_CD_NODE_ID: -1,  // 검종 NODE_ID값
      CHK_TYPE_CD_NAME: '',     // 검종명
      CHK_YEAR: '',
      WORK_AREA_CD_NODE_ID: '',
      SCH_USER_ID: '',
      EMP_NO: '',
      USER_NAME: '',
    },
  }

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
    getCallDataHandler(sagaKey, apiAry, this.initData);
  }

  initData = () => {
    const { result, chkTypeCd } = this.props;
    let workAreaList = [];
    let chkTypeList = [];
    if (result.workAreaList && result.workAreaList.categoryMapList) {
      workAreaList = result.workAreaList.categoryMapList;
    }
    if (result.chkTypeList && result.chkTypeList.categoryMapList) {
      chkTypeList = result.chkTypeList.categoryMapList;
    }
    
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo.CHK_TYPE_CD = chkTypeCd;
      
      const filterCate = chkTypeList.filter(item => item.CODE === chkTypeCd);
      if (filterCate.length === 1) {
        searchInfo.CHK_TYPE_CD_NODE_ID = filterCate[0].NODE_ID;
        searchInfo.CHK_TYPE_CD_NAME = filterCate[0].NAME_KOR;
      }

      return {
        workAreaList,
        searchInfo,
      }
    })
  };

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'targetList',
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
            key: item.CHK_CD,
          }))
        });
      }
      spinningOff();
    });
  };

  onCreateTargetSelection = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { searchInfo } = this.state;
    const submitData = {
      PARAM: {
        ...this.state.searchInfo
      }
    };
    Modal.confirm({
      title: `${searchInfo.CHK_YEAR}년도 ${searchInfo.CHK_TYPE_CD_NAME}검진 대상자 목록을 생성하시겠습니까?`,
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
    });
  };

  onDelete = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      message.info(<MessageContent>삭제할 대상을 선택해주세요.</MessageContent>);
      return false;
    }

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM : {
        CHK_CD_LIST: selectedRowKeys,
      }
    };

    const that = this;
    Modal.confirm({
      title: `선택한 대상자를 삭제하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      okText: '삭제',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'DELETE', '/api/eshs/v1/common/health/healthChkTarget', submitData, (id, res) => {
          if (res && res.result > 0) {
            message.info(<MessageContent>대상자를 삭제하였습니다.</MessageContent>);
          } else {
            message.info(<MessageContent>대상자 삭제에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
          that.getList();
        });
      },
    });
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  onUserSearchAfter = row => {
    if (row) {
      this.onChangeSearchInfo('SCH_USER_ID', row.USER_ID);
      this.onChangeSearchInfo('EMP_NO', row.EMP_NO);
    }
  };

  onChangeSelect = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onChkMstDetailPopup = row => {
    this.setState({
      selectedRow: row,
      isChkMstDetailShow: true,
    });
  };

  onCancelChkMstDetailPopup = () => {
    this.setState({ isChkMstDetailShow: false });
  };

  onChkMstInputPopup = () => {
    this.setState({ isChkMstInputShow: true });
  };

  onCancelChkMstInputPopup = () => {
    this.setState({ isChkMstInputShow: false });
  };

  onSaveAfter = () => {
    this.setState({ isChkMstInputShow: false });
    this.getList();
  };

  columns = [
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
      render: (text, record) => <StyledButton className="btn-link btn-sm" onClick={() => this.onChkMstDetailPopup(record)}>{text}</StyledButton>
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
      title: '검종',
      dataIndex: 'CHK_TYPE_CD_NAME',
      key: 'CHK_TYPE_CD_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '검진차수',
      dataIndex: 'CHK_SEQ',
      key: 'CHK_SEQ',
      align: 'center',
      width: '10%',
      render: text => `${text}차`,
    },
    {
      title: '비고',
      dataIndex: 'BIGO',
      key: 'BIGO',
      align: 'center',
    },
  ];

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onChangeSelect,
    };

    return (
      <>
        <AntdModal
          width={850}
          visible={this.state.isChkMstInputShow}
          title={`${this.state.searchInfo.CHK_TYPE_CD_NAME}검진 대상자 등록`}
          onCancel={this.onCancelChkMstInputPopup}
          destroyOnClose
          footer={null}
        >
          <ChkMstInput
            onCancelPopup={this.onCancelChkMstInputPopup}
            onSaveAfter={this.onSaveAfter}
            chkTypeCd={this.state.searchInfo.CHK_TYPE_CD}
            chkTypeCdNodeId={this.state.searchInfo.CHK_TYPE_CD_NODE_ID}
          />
        </AntdModal>
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
            <StyledButton className="btn-primary btn-sm mr5" onClick={this.onDelete}>삭제</StyledButton>
            <StyledButton className="btn-primary btn-sm mr5" onClick={this.onChkMstInputPopup}>등록</StyledButton>
            <StyledButton className="btn-primary btn-sm" onClick={this.onCreateTargetSelection}>대상자 목록 생성</StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list.map(item => ({ ...item, key: item.CHK_CD }))}
            bordered={true}
            rowSelection={rowSelection}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default TargetRegList;