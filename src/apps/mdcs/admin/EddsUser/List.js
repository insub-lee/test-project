import React, { Component } from 'react';
import { Table, Input } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ExcelDownload from 'components/ExcelDownLoad';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);

class List extends Component {
  state = {
    searchInfo: {}
  };

  componentDidMount() {
    this.getList();
  };

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'eddsUserList',
        url: '/api/mdcs/v1/common/operation/EddsUserList',
        type: 'POST',
        params: {
          PARAM: {
            ...this.state.searchInfo
          }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  colunms = [
    {
      title: 'ID',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '사용자명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '12%',
    },
    {
      title: '업체명',
      dataIndex: 'COMPANY_NAME',
      key: 'COMPANY_NAME',
      ellipsis: true,
    },
    {
      title: 'E-mail',
      dataIndex: 'EMAIL',
      key: 'EMAIL',
      width: '20%',
      ellipsis: true,
    },
    {
      title: '승인일자',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      align: 'center',
    },
  ];

  excelColumns = [
    {
      title: 'ID',
      width: { wpx: 200 },
      style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'Name',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'Company',
      width: { wpx: 300 },
      style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'email',
      width: { wpx: 250 },
      style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'Phone',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'Address',
      width: { wpx: 200 },
      style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: '승인일자',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
  ];

  fields = [
    { field: 'EMP_NO', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
    { field: 'NAME_KOR', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'COMPANY_NAME', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
    { field: 'EMAIL', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
    { field: 'MOBILE_TEL_NO', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'ADDRESS', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
    { field: 'REG_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  ];

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdInput
              className="ant-input-sm mr5" allowClear placeholder="사용자명" style={{ width: 110 }}
              onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, USER_NAME: e.target.value }})}
              onPressEnter={this.getList}
            />
            <AntdInput
              className="ant-input-sm mr5" allowClear placeholder="업체명" style={{ width: 110 }}
              onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, COMPANY_NAME: e.target.value }})}
              onPressEnter={this.getList}
            />
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>검색</StyledButton>
            <ExcelDownload
              key="excelDownLoad"
              isBuilder={false}
              fileName={`EDDS_UserList_${moment().format('YYYYMMDD')}`}
              className="workerExcelBtn"
              title="Excel 파일로 저장"
              btnSize="btn-sm"
              sheetName="EDDS_UserList"
              columns={this.excelColumns}
              fields={this.fields}
              dataSetBind={result && result.eddsUserList && result.eddsUserList.list ? result.eddsUserList.list : []}
              style={{ display: 'inline-block'}}
            />
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          dataSource={result && result.eddsUserList && result.eddsUserList.list ? result.eddsUserList.list.map(item => ({ ...item, key: item.USER_ID })) : []}
          columns={this.colunms}
          bordered
        />
      </StyledContentsWrapper>
    );
  }
}

export default List;