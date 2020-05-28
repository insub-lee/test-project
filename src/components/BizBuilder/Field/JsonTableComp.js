import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import { debounce } from 'lodash';

const AntdLineTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
// Config에서 컬럼 지정하면 clob 테이블에서 데이터 읽어와 테이블 만들어주는 컴포넌트
class JsonTableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      keyword: '',
    };
    this.getSearchData = debounce(this.getSearchData, 300);
  }

  componentDidMount() {
    // this.createColumns();
    this.getJsonData();
  }

  // createColumns = () => {
  //   const { CONFIG } = this.props;
  //   const columns = [];
  //   const tempCol = CONFIG.property.colName.split(',').map(column => column.trim().toUpperCase());
  //   const tempHeader = CONFIG.property.header.split(',').map(column => column.trim().toUpperCase());

  //   if (CONFIG.property.header) {
  //     for (let i = 0; i < tempCol.length; i += 1) {
  //       columns.push({ title: tempHeader[i], dataIndex: tempCol[i], key: tempCol[i], align: 'left' });
  //     }
  //   } else {
  //     for (let i = 0; i < tempCol.length; i += 1) {
  //       columns.push({ title: tempCol[i], dataIndex: tempCol[i], key: tempCol[i], align: 'left' });
  //     }
  //   }
  //   return columns;
  // };

  columns = [
    {
      title: '부서',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
      align: 'left',
    },
    {
      title: '성명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'left',
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      align: 'left',
    },
    {
      title: '직책',
      dataIndex: 'PSTN_NAME_KOR',
      key: 'PSTN_NAME_KOR',
      align: 'left',
    },
    {
      title: '1차',
      dataIndex: 'FIRST_SCORE',
      key: 'FIRST_SCORE',
      align: 'left',
    },
    {
      title: '2차',
      dataIndex: 'SECOND_SCORE',
      key: 'SECOND_SCORE',
      align: 'left',
    },
  ];

  getJsonData = (keyword = this.state.keyword) => {
    const { sagaKey: id, getExtraApiData, parentTaskSeq } = this.props;
    const apiArr = [
      {
        key: 'jsonData',
        url: `/api/eshs/v1/common/getjsondata?KEYWORD=${keyword}&PARENT_TASK_SEQ=${parentTaskSeq}`,
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    const getData = (extraApiData.jsonData && extraApiData.jsonData.jsonData) || [];
    this.setState({
      dataSource: getData,
    });
  };

  handleSearchChange = value => {
    this.setState(
      {
        keyword: value,
      },
      this.getJsonData(value),
    );
  };

  getSearchData = value => {
    this.getJsonData(value);
  };

  render() {
    const { handleSearchChange, columns } = this;
    const { dataSource } = this.state;
    return (
      <>
        <AntdSearch
          className="ant-search-inline"
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="검색어를 입력하세요."
          style={{ width: '25%' }}
        />
        <AntdLineTable
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          footer={() => <div style={{ textAlign: 'center' }}>{`${dataSource && dataSource.length} 명`}</div>}
        />
      </>
    );
  }
}

JsonTableComp.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  parentTaskSeq: PropTypes.number,
  extraApiData: PropTypes.object,
};

export default JsonTableComp;
