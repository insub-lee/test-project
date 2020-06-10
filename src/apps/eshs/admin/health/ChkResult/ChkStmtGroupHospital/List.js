import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

import EmpChkResultDetail from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail';

import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      searchParam: {
        CHK_YEAR: currentYear,
      },
      columns: [
        {
          title: '검진기관',
          dataIndex: 'HOSPITAL_NAME',
          width: '50%',
          align: 'center',
        },
        {
          title: '계',
          dataIndex: '',
          width: '50%',
          align: 'center',
        },
      ],
      list: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();

    const yearList = [];
    for (let i = currentYear; i >= 1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList });

    this.getInitData();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
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
          PARAM: { NODE_ID: 675 },
        },
      },
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 },
        },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const { searchParam } = this.state;

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthHospitalGroupCnt`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, this.getListAfter);
  };

  getListAfter = () => {
    const { result, spinningOff } = this.props;
    const list = (result && result.List && result.List.list) || [];
    const searchList = [];
    const sumObj = { SUM: 0 };
    const newColumns = [
      {
        title: '검진기관',
        dataIndex: 'HOSPITAL_NAME',
        width: '200px',
        align: 'center',
      },
    ];
    const totalCntCol = {
      title: '계',
      dataIndex: 'SUM',
      width: '70px',
      align: 'center',
    };
    list.forEach(item => {
      const hCode = item.HOSPITAL_CODE;
      const fIdx = searchList.findIndex(s => s.HOSPITAL_CODE === hCode);
      if (fIdx >= 0) {
        searchList[fIdx] = { ...searchList[fIdx], [item.DISEASE_CD]: item.CNT, SUM: searchList[fIdx].SUM + item.CNT };
      } else {
        searchList.push({ HOSPITAL_CODE: item.HOSPITAL_CODE, HOSPITAL_NAME: item.HOSPITAL_NAME, [item.DISEASE_CD]: item.CNT, SUM: item.CNT });
      }
      if (newColumns.findIndex(n => n.dataIndex === item.DISEASE_CD) < 0) {
        newColumns.push({
          title: item.DISEASE_NAME,
          dataIndex: item.DISEASE_CD,
          width: '70px',
          align: 'center',
        });
      }

      const currSum = sumObj[item.DISEASE_CD] || 0;
      sumObj[item.DISEASE_CD] = currSum + item.CNT;
      sumObj.SUM += item.CNT;
    });
    sumObj.HOSPITAL_NAME = `${searchList.length} 건`;
    newColumns.push(totalCntCol);
    searchList.push(sumObj);
    this.setState(
      {
        columns: newColumns,
        list: searchList,
      },
      spinningOff,
    );
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  render() {
    const { result } = this.props;
    const { yearList, columns, list } = this.state;
    const chkTypeList = (result && result.chkTypeList && result.chkTypeList.categoryMapList) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];

    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSelect
                defaultValue={currentYear}
                className="select-sm mr5"
                style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
                {yearList.map(year => (
                  <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역"
                onChange={val => this.onChangeSearchParam('WORK_AREA_CD', val)}
              >
                {workAreaList
                  .filter(item => item.LVL === 1)
                  .map(item => (
                    <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="검종"
                onChange={val => this.onChangeSearchParam('CHK_TYPE_CD_NODE_ID', val)}
              >
                {chkTypeList
                  .filter(item => item.LVL === 3)
                  .map(item => (
                    <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                  ))}
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={columns} dataSource={list || []} bordered pagination={false} />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;
