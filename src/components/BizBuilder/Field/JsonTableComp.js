import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

const AntdLineTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
// Config에서 컬럼 지정하면 clob 테이블에서 데이터 읽어와 테이블 만들어주는 컴포넌트
class JsonTableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.createColumns();
    this.getJsonData();
  }

  createColumns = () => {
    const { CONFIG } = this.props;
    const columns = [];
    const tempCol = CONFIG.property.colName.split(',').map(column => column.trim().toUpperCase());
    const tempHeader = CONFIG.property.header.split(',').map(column => column.trim().toUpperCase());

    if (CONFIG.property.header) {
      for (let i = 0; i < tempCol.length; i += 1) {
        columns.push({ title: tempHeader[i], dataIndex: tempCol[i], key: tempCol[i], align: 'left' });
      }
    } else {
      for (let i = 0; i < tempCol.length; i += 1) {
        columns.push({ title: tempCol[i], dataIndex: tempCol[i], key: tempCol[i], align: 'left' });
      }
    }
    console.debug(columns);
    return columns;
  };

  getJsonData = () => {
    const { sagaKey: id, getExtraApiData, workInfo, parentTaskSeq } = this.props;
    const apiArr = [
      {
        key: 'jsonData',
        url: `/api/eshs/v1/common/getjsondata?WORK_ID=WBT_${workInfo.WORK_ID}C&MAIN_WORK_ID=WBT_${workInfo.WORK_ID}&PARENT_TASK_SEQ=${parentTaskSeq}`,
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    const getData = (extraApiData.jsonData && extraApiData.jsonData.jsonData[0] && JSON.parse(extraApiData.jsonData.jsonData[0].JSONDATA)) || [];
    this.setState({
      dataSource: getData,
    });
  };

  handleSearchChange = value => {
    console.debug(value);
  };

  render() {
    const { handleSearchChange, createColumns } = this;
    const { dataSource } = this.state;
    return (
      <>
        <AntdSearch
          className="ant-search-inline"
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="검색어를 입력하세요."
          style={{ width: '25%' }}
        />
        <AntdLineTable columns={createColumns()} dataSource={dataSource} />
      </>
    );
  }
}

JsonTableComp.propTypes = {
  CONFIG: PropTypes.object,
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  workInfo: PropTypes.object,
  parentTaskSeq: PropTypes.number,
  extraApiData: PropTypes.object,
};

export default JsonTableComp;
