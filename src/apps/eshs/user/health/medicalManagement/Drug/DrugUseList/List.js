import React, { Component } from 'react';
import { Table, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import moment from 'moment';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

const now = new Date();
const currentYear = now.getFullYear().toString();
const currentMonth = now.getMonth() + 1;
const currentDate = now.getDate();

const fromDate = moment(`${currentYear}-${currentMonth}-${currentDate}`).format('YYYY-MM-DD');
const toDate = moment(`${currentYear}-${currentMonth}-01`).format('YYYY-MM-DD');

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
          TO_DATE: toDate,
          FROM_DATE: fromDate,
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
        url: `/api/eshs/v1/common/health/eshsHealthMdeicineUseList`,
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
        url: `/api/eshs/v1/common/health/eshsHealthMdeicineUseList`,
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

  onChangeRangeDatePicker = (val1, val2) => {
    if (val2.length === 2) {
      const { searchParam } = this.state;
      this.setState({
        searchParam: { ...searchParam, TO_DATE: val2[0], FROM_DATE: val2[1] },
      });
    }
  };

  columns = [
    {
      title: '품목',
      dataIndex: 'DRUG',
      width: '30%',
      align: 'center',
    },
    {
      title: '제약회사',
      dataIndex: 'COMPANY',
      width: '16%',
      align: 'center',
    },
    {
      title: '규격',
      dataIndex: 'SIZE1',
      width: '8%',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      width: '8%',
      align: 'center',
    },
    {
      title: '수량',
      dataIndex: 'QTY',
      width: '8%',
      align: 'center',
      render: text => text || 0,
    },
    {
      title: '비고',
      dataIndex: 'COMMENTS',
      width: '30%',
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
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                style={{ width: 325 }}
                defaultValue={[moment(toDate), moment(fromDate)]}
                onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
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
