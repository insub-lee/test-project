import React, { Component } from 'react';
import { Select, DatePicker, Table } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdSelect = StyledSelect(Select);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);
const AntdTable = StyledAntdTable(Table);

class TargetStatus extends Component {
  state = {
    searchInfo: {},
  }

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
          PARAM: { NODE_ID: 316 }
        },
      },
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'targetStatus',
        url: `/api/eshs/v1/common/health/helathHireChkTargetStatus`,
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo }
        }
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  columns = [
    {
      title: '검진기관',
      dataIndex: 'HOSPITAL_NAME',
      key: 'HOSPITAL_NAME',
      align: 'center',
      render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
    },
    {
      title: '대상인원',
      dataIndex: 'HOSPITAL_TOTAL',
      key: 'HOSPITAL_TOTAL',
      width: '8%',
      align: 'center',
      render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
    },
    {
      title: '실시인원',
      children: [
        {
          title: '채용',
          dataIndex: 'HIRE_CNT',
          key: 'HIRE_CNT',
          width: '7%',
          align: 'center',
          render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
        },
        {
          title: '배치전',
          dataIndex: 'BEFORE_CNT',
          key: 'BEFORE_CNT',
          width: '7%',
          align: 'center',
          render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
        },
        {
          title: '계',
          dataIndex: 'HOSPITAL_CHK_CNT',
          key: 'HOSPITAL_CHK_CNT',
          width: '7%',
          align: 'center',
          render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
        },
      ],
    },
    {
      title: '재검',
      dataIndex: 'RE_CHK_CNT',
      key: 'RE_CHK_CNT',
      width: '7%',
      align: 'center',
      render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
    },
    {
      title: '재검(%)',
      dataIndex: 'RE_CHK_RATE',
      key: 'RE_CHK_RATE',
      width: '7%',
      align: 'center',
      render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}%</b> : `${text}%`,
    },
    {
      title: '검진결과',
      children: [
        {
          title: '적합',
          dataIndex: 'GOOD_CNT',
          key: 'GOOD_CNT',
          width: '7%',
          align: 'center',
          render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
        },
        {
          title: '부적합',
          dataIndex: 'NOT_GOOD_CNT',
          key: 'NOT_GOOD_CNT',
          width: '7%',
          align: 'center',
          render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
        },
        {
          title: '계',
          dataIndex: 'TOTAL_GOODS_CNT',
          key: 'TOTAL_GOODS_CNT',
          width: '7%',
          align: 'center',
          render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}</b> : text,
        },
      ],
    },
    {
      title: '부적합(%)',
      dataIndex: 'NOT_GOOD_RATE',
      key: 'NOT_GOOD_RATE',
      width: '7%',
      align: 'center',
      render: (text, record) => record.HOSPITAL_CODE === -1 ? <b style={{ color: '#000' }}>{text}%</b> : `${text}%`,
    },
  ];

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdSelect
              className="select-sm mr5" allowClear placeholder="지역" style={{ width: 110 }}
              onChange={val => this.setState({ searchInfo: { ...this.state.searchInfo, WORK_AREA_CD_NODE_ID: val } })}
            >
            {result && result.workAreaList && result.workAreaList.categoryMapList && (
              result.workAreaList.categoryMapList.filter(cate => cate.LVL === 1).map(cate => (
                <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
              ))
            )}
            </AntdSelect>
            <AntdRangePicker
              defaultValue={[moment(this.state.searchInfo.FROM_DT), moment(this.state.searchInfo.TO_DT)]}
              className="ant-picker-sm mr5" style={{ width: 220 }} format="YYYY-MM-DD" allowClear={false}
              onChange={(val1, val2) => this.setState({ searchInfo: { ...this.state.searchInfo, FROM_DT: val2[0], TO_DT: val2[1] } })}
            />
            <AntdSelect
              className="select-sm mr5" allowClear placeholder="검진기관" style={{ width: 200 }}
              onChange={val => this.setState({ searchInfo: { ...this.state.searchInfo, HOSPITAL_CODE: val } })}
            >
            {result && result.hospitalList && result.hospitalList.list && (
              result.hospitalList.list.map(item => (
                <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
              ))
            )}
            </AntdSelect>
            <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          columns={this.columns}
          dataSource={result && result.targetStatus && result.targetStatus.list ? result.targetStatus.list.map(item => ({ ...item, key: item.HOSPITAL_CODE })) : [] }
          bordered
          pagination={false}
        />
      </StyledContentsWrapper>
    );
  }
}

export default TargetStatus;
