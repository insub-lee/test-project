import React from 'react';
import PropTypes from 'prop-types';
import Table from 'rc-table';

import jsonToQueryString from '../../../../utils/jsonToQueryString';
import Pagination from '../../../Tableboard/Pagination';
import StyledBodyCell from '../../../Tableboard/StyledBodyCell';
import StyledBodyRow from '../../../Tableboard/StyledBodyRow';
import StyledHeader from '../../../Tableboard/StyledHeader';
import StyledHeaderCell from '../../../Tableboard/StyledHeaderCell';
import StyledTable from '../../../Tableboard/StyledTable';
import StyledTableWrapper from './StyledTableWrapper';
import service from '../service';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    };

    this.fetchData = this.fetchData.bind(this);
    this.pageHandler = this.pageHandler.bind(this);
    this.pageSizeHandler = this.pageSizeHandler.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    this.fetchData().then(payload => {
      this.setState(prevState => ({
        list: payload.list,
        pagination: {
          ...prevState.pagination,
          total: payload.pagination.total,
        },
      }));
    });
  }

  pageHandler(page) {
    this.setState(
      prevState => ({
        pagination: {
          ...prevState.pagination,
          current: page,
        },
      }),
      () => {
        this.fetchData().then(payload => {
          this.setState(preState => ({
            list: payload.list,
            pagination: {
              ...preState.pagination,
              total: payload.pagination.total,
            },
          }));
        });
      },
    );
  }

  pageSizeHandler(e) {
    const pageSize = parseInt(e.target.value, 10);
    this.setState(
      prevState => ({
        pagination: {
          ...prevState.pagination,
          pageSize,
          current: 1,
        },
      }),
      () => {
        this.fetchData().then(payload => {
          this.setState(preState => ({
            list: payload.list,
            pagination: {
              ...preState.pagination,
              total: payload.pagination.total,
            },
          }));
        });
      },
    );
  }

  async fetchData() {
    const { searchName } = this.props;
    const { pagination } = this.state;
    const requestQuery = {
      type: 'bestPractice',
      // emrNo: '139092',
      title: searchName,
      currentpage: pagination.current,
      pageSize: pagination.pageSize,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.board.get(queryString);
    let payload = [];
    if (response && !error) {
      const { list } = response;
      payload.list = list;
      payload.pagination = { total: response.pagination.total };
      return payload;
    }
    payload = {
      list: [],
      pagination: {
        total: 0,
      },
    };
    return payload;
  }

  handleRowClick(rowData, index) {
    const { callbackAfterFetch } = this.props;
    console.debug(rowData, index);
    callbackAfterFetch(rowData);
  }

  render() {
    const { pagination, list } = this.state;
    const { columns } = this.props;
    const components = {
      table: StyledTable,
      header: {
        wrapper: StyledHeader,
        cell: StyledHeaderCell,
      },
      body: {
        row: StyledBodyRow,
        cell: StyledBodyCell,
      },
    };
    return (
      <StyledTableWrapper>
        <Table
          columns={columns}
          data={list}
          rowKey="postno"
          rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
          components={components}
          // onRowClick={(record, index) => this.handleRowClick(record, index)}
        />
        <Pagination {...pagination} groupSize={10} pageHandler={this.pageHandler} pageSizeHandler={this.pageSizeHandler} />
      </StyledTableWrapper>
    );
  }
}

DataTable.propTypes = {
  searchName: PropTypes.string,
};

DataTable.defaultProps = {
  searchName: '',
};

export default DataTable;
