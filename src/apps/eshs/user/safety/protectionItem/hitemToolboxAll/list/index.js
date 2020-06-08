import React from 'react';
import PropTypes from 'prop-types';
import { Table, InputNumber, Select } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import moment from 'moment';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchValue: {
        chkYear: '',
        // chkYear: '2015',
      },
      requestValue: {},
    };
  }

  columns = () => [
    {
      title: '관리부서',
      dataIndex: 'DEPT_NAME_KOR',
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'FAB',
      dataIndex: 'FAB',
      align: 'center',
      fixed: 'left',
    },
    {
      title: '층',
      dataIndex: 'FLOOR',
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'NO',
      dataIndex: 'SEQ',
      align: 'center',
      fixed: 'left',
    },
    {
      title: '품목',
      children: [
        {
          title: '위치코드',
          dataIndex: 'FLOOR_CD',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '위치',
          dataIndex: 'FLOOR_NM',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: '관리자',
      children: [
        {
          title: '정',
          dataIndex: 'MASTER_EMP_NM',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '부',
          dataIndex: 'SLAVE_EMP_NM',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Emergency Lock',
      children: [
        {
          title: 'Number',
          dataIndex: 'TEL',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: '방독면',
      align: 'center',
      render: record => <span>{record.T1}</span>,
    },
    {
      title: '카트리지',
      align: 'center',
      render: record => <span>{record.T2}</span>,
    },
    {
      title: '보안경',
      align: 'center',
      render: record => <span>{record.T3}</span>,
    },
    {
      title: '보안면',
      align: 'center',
      render: record => <span>{record.T4}</span>,
    },
    {
      title: '내산장갑(대)',
      align: 'center',
      render: record => <span>{record.T5}</span>,
    },
    {
      title: '내산장갑(소)',
      align: 'center',
      render: record => <span>{record.T6}</span>,
    },
    {
      title: 'PH Paper',
      align: 'center',
      render: record => <span>{record.T7}</span>,
    },
    {
      title: '(산)중화제600ml',
      align: 'center',
      render: record => <span>{record.T8}</span>,
    },
    {
      title: '(산)중화제4l',
      align: 'center',
      render: record => <span>{record.T9}</span>,
    },
    {
      title: '(산)중화제10l',
      align: 'center',
      render: record => <span>{record.T10}</span>,
    },
    {
      title: '(알)중화제600ml',
      align: 'center',
      render: record => <span>{record.T11}</span>,
    },
    {
      title: '(알)중화제4l',
      align: 'center',
      render: record => <span>{record.T12}</span>,
    },
    {
      title: '(알)중화제10l',
      align: 'center',
      render: record => <span>{record.T13}</span>,
    },
    {
      title: '흡착포원형',
      align: 'center',
      render: record => <span>{record.T14}</span>,
    },
    {
      title: '흡착포사각',
      align: 'center',
      render: record => <span>{record.T15}</span>,
    },
    {
      title: '앞치마',
      align: 'center',
      render: record => <span>{record.T16}</span>,
    },
    {
      title: '토시',
      align: 'center',
      render: record => <span>{record.T17}</span>,
    },
    {
      title: '화학복',
      align: 'center',
      render: record => <span>{record.T18}</span>,
    },
    {
      title: '장화',
      align: 'center',
      render: record => <span>{record.T19}</span>,
    },
    {
      title: '방열장갑',
      align: 'center',
      render: record => <span>{record.T20}</span>,
    },
    {
      title: '귀마개',
      align: 'center',
      render: record => <span>{record.T21}</span>,
    },
    {
      title: '비고',
      align: 'center',
      render: record => <span>{record.T22}</span>,
    },
  ];

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { setDataSource } = this;
    const { searchValue } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'toolboxList',
        url: `/api/eshs/v1/common/protectiontoolboxall?CHK_YEAR=${searchValue.chkYear}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.toolboxList && result.toolboxList.list) || [],
    });
  };

  createYearList = () => {
    const currentYear = moment().year();
    const yearList = [];
    for (let i = 2008; i <= Number(currentYear); i += 1) {
      yearList.push(i.toString());
    }
    return yearList;
  };

  handleSearchChange = (key, value) => {
    const { getDataSource } = this;
    this.setState(prevState => {
      if (key === 'chkYear') {
        return { searchValue: Object.assign(prevState.searchValue, { [key]: value }), selectedYear: Number(value) + 1 };
      }
      return { searchValue: Object.assign(prevState.searchValue, { [key]: value }) };
    }, getDataSource);
  };

  yearList = this.createYearList();

  handleInputChange = (key, id, value) => {
    const valueObj = { [key]: value.toString() };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  render() {
    const { columns, yearList, handleSearchChange } = this;
    const { dataSource } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">평가년도</span>
              <AntdSelect
                className="select-mid mr5 ml5"
                defaultValue={moment().format('YYYY')}
                onChange={value => handleSearchChange('chkYear', value)}
                style={{ width: '10%' }}
              >
                {yearList.map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ padding: '10px' }}>
            <AntdTable bordered columns={columns()} dataSource={dataSource} scroll={{ x: true }} pagination={false} />
          </div>
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};

List.defaultProps = {};

export default List;
