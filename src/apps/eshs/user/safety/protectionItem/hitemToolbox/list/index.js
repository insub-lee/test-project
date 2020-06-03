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
    };
  }

  test = [
    {
      DEPT_NM: '생산4팀',
      FAB: 'C2',
      FLOOR: '4F',
      NO: 4,
    },
  ];

  columns = [
    {
      title: '관리부서',
      dataIndex: 'DEPT_NM',
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
          title: '기본수량',
          dataIndex: '',
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
          dataIndex: '',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '부',
          dataIndex: '',
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
          dataIndex: '',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: '방독면',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '카트리지',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '보안경',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '보안면',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '내산장갑(대)',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '내산장갑(소)',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: 'PH Paper',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '(산)중화제600ml',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '(산)중화제4l',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '(산)중화제10l',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '(알)중화제600ml',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '(알)중화제4l',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '(알)중화제10l',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '흡착포원형',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '흡착포사각',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '앞치마',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '토시',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '화학복',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '장화',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '방열장갑',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '귀마개',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
    {
      title: '비고',
      dataIndex: '',
      align: 'center',
      render: () => <InputNumber defaultValue={0} />,
    },
  ];

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { setDataSource } = this;
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'toolboxList',
        url: ``,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiArr, setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    this.setState({ dataSource: (extraApiData.toolboxList && extraApiData.toolboxList.list) || [] });
  };

  createYearList = () => {
    const currentYear = moment().year();
    const yearList = [];
    for (let i = 2009; i <= Number(currentYear); i += 1) {
      yearList.push(i.toString());
    }
    return yearList;
  };

  yearList = this.createYearList();

  render() {
    const { columns, yearList } = this;
    const { dataSource } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div>
              <span>평가년도</span>
              <AntdSelect className="select-mid mr5 ml5" defaultValue={moment().format('YYYY')} style={{ width: '10%' }}>
                {yearList.map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
              <span>부서코드</span>
              <AntdSelect className="select-mid mr5 ml5" style={{ width: '15%' }}></AntdSelect>
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ padding: '10px' }}>
            <AntdTable columns={columns} dataSource={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]} scroll={{ x: true }} />
            <Table columns={columns} dataSource={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]} scroll={{ x: true }} />
          </div>
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

List.defaultProps = {};

export default List;
