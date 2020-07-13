import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

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

  // getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           this.searchInput = node;
  //         }}
  //         placeholder="Search "
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
  //         Search
  //       </Button>
  //       <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //         Reset
  //       </Button>
  //     </div>
  //   ),
  //   filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select());
  //     }
  //   },
  // });

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
      // sorter: (a, b) => {
      //   if (a.DOCNUMBER === b.DOCNUMBER) return 0;
      //   if (a.DOCNUMBER > b.DOCNUMBER) return 1;
      //   if (a.DOCNUMBER < b.DOCNUMBER) return -1;
      // },
      // ...this.getColumnSearchProps('DOCNUMBER'),
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
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
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
