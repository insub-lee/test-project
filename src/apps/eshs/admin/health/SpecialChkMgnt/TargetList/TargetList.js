import React, { Component } from 'react';
import { Table, Modal, Select } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import ChkMstDetail from 'apps/eshs/admin/health/common/ChkMstDetail';

const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class TargetList extends Component {
  state = {
    isChkMstDetailShow: false,
    list: [],
    yearList: [],
    workAreaList: [],
    selectedRow: {},
    searchInfo: {
      CHK_TYPE_CD: '003',        // 검종코드값
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
      yearList.push(i.toString());
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
      
      const filterCate = chkTypeList.filter(item => item.CODE === searchInfo.CHK_TYPE_CD);
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

  onChkMstDetailPopup = row => {
    this.setState({
      selectedRow: row,
      isChkMstDetailShow: true,
    });
  };

  onCancelChkMstDetailPopup = () => {
    this.setState({ isChkMstDetailShow: false });
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
      // render: (text, record) => <StyledButton className="btn-link btn-sm" onClick={() => this.onChkMstDetailPopup(record)}>{text}</StyledButton>
    },
    // {
    //   title: '배우자검진',
    //   dataIndex: 'FAM_NAME',
    //   key: 'FAM_NAME',
    //   align: 'center',
    //   width: '10%',
    //   render: (text, record) => record.IS_MATE === '1' ? text : '',
    // },
    {
      title: '근무지',
      dataIndex: 'WORK_AREA_NAME',
      key: 'WORK_AREA_NAME',
      width: '8%',
      align: 'center',
    },
    {
      title: '부서',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
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
      title: '검진일',
      dataIndex: 'CHK_DT',
      key: 'CHK_DT',
      align: 'center',
      width: '10%',
      render: text => text ? moment(text).format('YYYY-MM-DD') : '',
    },
    {
      title: '미시행사유',
      dataIndex: 'N_CHK_REASON_NAME',
      key: 'N_CHK_REASON_NAME',
      align: 'center',
      width: '12%',
    },
  ];

  render() {
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
                defaultValue={this.state.searchInfo.CHK_YEAR} className="select-sm mr5" placeholder="년도" style={{ width: 100 }}
                onChange={val => this.onChangeSearchInfo('CHK_YEAR', val)}
              >
                {this.state.yearList.map(year => (
                  <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
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
              <UserSearchModal onClickRow={this.onUserSearchAfter} />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list.map(item => ({ ...item, key: item.CHK_CD }))}
            bordered={true}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default TargetList;