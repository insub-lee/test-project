import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input } from 'antd';
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

class ExternalDistributeList extends Component {
  state = {
    searchText: '',
    searchInfo: {}
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'externalDistributeList',
        url: '/api/mdcs/v1/common/externalDistributeList',
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
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  columns = [
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '5%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '업체명',
      dataIndex: 'RECV_DEPT_NAME',
      key: 'RECV_DEPT_NAME',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '수신자',
      dataIndex: 'RECV_USER_NAME',
      key: 'RECV_USER_NAME',
      width: '10%',
    },
    {
      title: '배포자',
      dataIndex: 'DIST_USER_NAME',
      key: 'DIST_USER_NAME',
      width: '10%',
    },
    {
      title: '배포일',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      width: '10%',
    },
    {
      title: '열람여부',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '10%',
      render: (text, record) => (record.STATUS === 0 ? '  In progress' : 'Completed'),
    },
  ];

  excelColumns = [
    {
      title: 'No.',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'Rev',
      width: { wpx: 30 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: 'Title',
      width: { wpx: 300 },
      style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: '업체명',
      width: { wpx: 150 },
      style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: '수신자',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: '배포자',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: '배포일',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
    {
      title: '열람여부',
      width: { wpx: 100 },
      style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
    },
  ];

  fields = [
    { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
    { field: 'RECV_DEPT_NAME', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
    { field: 'RECV_USER_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'DIST_USER_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'REG_DATE', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
    { field: 'STATUS', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  ];

  render() {
    const {
      result: { externalDistributeList },
    } = this.props;
    let list = [];
    if (externalDistributeList && externalDistributeList !== undefined) {
      if (externalDistributeList.list !== undefined) {
        list = externalDistributeList.list;
      }
    }

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 외부배포 현황
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="문서번호" style={{ width: 130 }}
                onChange={e => this.onChangeSearchInfo('DOCNUMBER', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="Title" style={{ width: 150 }}
                onChange={e => this.onChangeSearchInfo('TITLE', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="업체명" style={{ width: 150 }}
                onChange={e => this.onChangeSearchInfo('RECV_DEPT_NAME', e.target.value)}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>검색</StyledButton>
              <ExcelDownload
                key="excelDownLoad"
                isBuilder={false}
                fileName={`외부배포현황 (${moment().format('YYYYMMDD')})`}
                className="workerExcelBtn"
                title="Excel 파일로 저장"
                btnSize="btn-sm"
                sheetName=""
                columns={this.excelColumns}
                fields={this.fields}
                dataSetBind={list.map(item => ({ ...item, STATUS: item.STATUS === 0 ? '  In progress' : 'Completed' }))}
                style={{ display: 'inline-block'}}
              />
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable dataSource={list.map(item => ({ ...item, key: `${item.TRANS_NO}_${item.RECV_USER_ID}` }))} columns={this.columns} bordered />
        </StyledContentsWrapper>
      </>
    );
  }
}

ExternalDistributeList.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

ExternalDistributeList.defaultProps = {
  sagaKey: 'externalDistribute',
  result: {
    externalDistributeList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default ExternalDistributeList;
