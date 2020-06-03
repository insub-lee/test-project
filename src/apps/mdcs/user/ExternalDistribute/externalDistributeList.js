import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Input } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';

const AntdTable = StyledAntdTable(Table);

class ExternalDistributeList extends Component {
  state = {
    searchText: '',
  };

  componentDidMount() {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder="Search "
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  columns = [
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
      sorter: (a, b) => {
        if (a.DOCNUMBER === b.DOCNUMBER) return 0;
        if (a.DOCNUMBER > b.DOCNUMBER) return 1;
        if (a.DOCNUMBER < b.DOCNUMBER) return -1;
      },
      ...this.getColumnSearchProps('DOCNUMBER'),
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
    },
    {
      title: '업체명',
      dataIndex: 'RECV_DEPT_NAME',
      key: 'RECV_DEPT_NAME',
      width: '15%',
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
          <AntdTable dataSource={list.map(item => ({ ...item, key: `${item.TRANS_NO}_${item.RECV_USER_ID}` }))} columns={this.columns} />
        </StyledContentsWrapper>
      </>
    );
  }
}

ExternalDistributeList.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

ExternalDistributeList.defaultProps = {
  id: 'externalDistribute',
  apiAry: [
    {
      key: 'externalDistributeList',
      url: '/api/mdcs/v1/common/externalDistributeList',
      type: 'POST',
      params: {},
    },
  ],
  result: {
    externalDistributeList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default ExternalDistributeList;
