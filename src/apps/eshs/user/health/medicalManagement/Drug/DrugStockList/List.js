import React, { Component } from 'react';
import { Table, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

import moment from 'moment';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);

const now = new Date();

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {},
    };
  }

  componentDidMount() {
    const { spinningOn } = this.props;
    spinningOn();
    this.setState(
      {
        searchParam: {
          OUT_DATE: moment(now).format('YYYY-MM'),
        },
      },
      this.getInitData,
    );
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
    const { searchParam } = this.state;
    const apiAry = [
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 },
        },
      },
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthMedicineStockList`,
        type: 'POST',
        params: { PARAM: searchParam },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;
    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthMedicineStockList`,
        type: 'POST',
        params: { PARAM: searchParam },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  columns = [
    {
      title: '품목',
      dataIndex: 'DRUG',
      width: '22%',
      align: 'center',
    },
    {
      title: '제약회사',
      dataIndex: 'COMPANY',
      width: '18%',
      align: 'center',
    },
    {
      title: '규격',
      dataIndex: 'SIZE1',
      width: '8%',
      align: 'center',
    },
    {
      title: '지급',
      dataIndex: 'OUT_QTY',
      width: '8%',
      align: 'center',
    },
    {
      title: '입고',
      dataIndex: 'IN_QTY',
      width: '8%',
      align: 'center',
    },
    {
      title: '현재고',
      dataIndex: 'QUANTITY',
      width: '8%',
      align: 'center',
    },
    {
      title: '비고',
      dataIndex: 'COMMENTS',
      width: '20%',
      align: 'center',
    },
    {
      title: '총 지급',
      dataIndex: 'ALL_OUT_QTY',
      width: '8%',
      align: 'center',
    },
  ];

  render() {
    const { result } = this.props;
    const list = (result && result.List && result.List.list) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];

    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역"
                onChange={val => this.onChangeSearchParam('SITE_NODE_ID', val)}
              >
                {workAreaList
                  .filter(item => item.LVL === 1)
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdDatePicker
                className="ant-picker-sm mr5"
                style={{ width: 120 }}
                open={this.state.datePickerOpen}
                mode="month"
                format="YYYY-MM"
                allowClear={false}
                onOpenChange={status => this.setState({ datePickerOpen: status })}
                onPanelChange={value => this.setState({ datePickerOpen: false }, () => this.onChangeSearchParam('OUT_DATE', moment(value).format('YYYY-MM')))}
                value={moment(this.state.searchParam.OUT_DATE || now)}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <ExcelDownloadComp
                isBuilder={false}
                fileName={`EHS_StockList_${moment().format('YYYYMMDD')}`}
                className="testClassName"
                btnText="엑셀받기"
                sheetName={`EHS_StockList_${moment().format('YYYYMMDD')}`}
                listData={list}
                btnSize="btn-sm btn-first"
                fields={this.columns.map(item => ({
                  field: item.dataIndex,
                  style: { numFmt: '0', font: { sz: '12' }, alignment: { vertical: item.excelAlign || 'center', horizontal: item.excelAlign || 'center' } },
                }))}
                columns={this.columns.map(item => ({
                  ...item,
                  field: item.dataIndex,
                  filter: 'agTextColumnFilter',
                  width: item.width ? { wpx: Number(item.width.replace('%', '')) * 10 } : { wpx: 150 },
                  style: {
                    fill: { fgColor: { rgb: 'D6EBFF' } },
                    font: { sz: '', bold: true },
                    alignment: { vertical: 'center', horizontal: 'center' },
                  },
                }))}
              />
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            footer={() => <span>{`${(list && list.length) || 0} 건`}</span>}
            dataSource={list || []}
            bordered
            pagination={false}
            scroll={{ y: '100%' }}
            rowKey="DRUG_CD"
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  result: {},
  getCallDataHandler: () => {},
};

export default List;
