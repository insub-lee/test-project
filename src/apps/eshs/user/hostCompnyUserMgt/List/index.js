/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import SearchBar from './SearchBar';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  handleAppStart = () => {
    const { result, id, changeFormData } = this.props;
    const userList = (result && result.selectAllUserList && result.selectAllUserList.list) || [];
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    changeFormData(id, 'cmpnyList', cmpnyList);
    this.setState({
      userList,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  setList = () => {
    const { formData } = this.props;
    const { userList } = this.state;
    const searchList = (formData && formData.searchList) || [];
    let list = [];
    const is_search = (formData && formData.is_search) || false;
    if (is_search) list = searchList;
    else list = userList;
    return list;
  };

  onRowClick = e => {
    const { id, changeFormData } = this.props;

    changeFormData(id, 'userModalType', 'UPDATE');
    changeFormData(id, 'selectedUser', e.rowData);
    changeFormData(id, 'userModal', true);
  };

  noRowsRenderer = () => <div className="noRows">0 명</div>;

  getColumns = () => [
    { label: '소속', dataKey: 'belong', width: 350, ratio: 25 },
    { label: '이름', dataKey: 'emp_nm', width: 200, ratio: 14 },
    { label: '직위', dataKey: 'emp_position', width: 200, ratio: 12 },
    { label: '직책', dataKey: 'duty', width: 200, ratio: 12 },
    { label: '근무지', dataKey: 'site', width: 200, ratio: 12 },
    { label: '전화번호', dataKey: 'tel', width: 350, ratio: 25 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  render() {
    const list = this.setList();
    return (
      <div className="hostCmpnyUserMgt">
        <SearchBar {...this.props} handleAppStart={this.handleAppStart} />
        <StyledVirtualizedTable>
          {/* <AutoSizer disableHeight>
            <Table
              width={1500}
              height={900}
              headerHeight={30}
              rowHeight={23}
              rowCount={list.length}
              rowGetter={({ index }) => list[index]}
              noRowsRenderer={this.noRowsRenderer}
              onRowClick={this.onRowClick}
              >
              <Column label="소속" dataKey="belong" width={350} className="ReactVirtualized__Table__rowColumn_belong" />
              <Column label="이름" dataKey="emp_nm" width={200} />
              <Column label="직위" dataKey="emp_position" width={200} />
              <Column label="직책" dataKey="duty" width={200} />
              <Column label="근무지" dataKey="site" width={200} />
              <Column label="전화번호" dataKey="tel" width={350} />
              </Table>
            </AutoSizer> */}
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={500}
                headerHeight={40}
                rowHeight={53}
                rowCount={list.length}
                rowGetter={({ index }) => list[index]}
                noRowsRenderer={this.noRowsRenderer}
                onRowClick={this.onRowClick}
              >
                {this.getColumns().map(({ label, dataKey, ratio }) => (
                  <Column key={dataKey} label={label} dataKey={dataKey} width={(width / 100) * ratio} />
                ))}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualizedTable>
      </div>
    );
  }
}

List.defaultProps = {
  id: 'EshshostCompny',
  getCallDataHandler: () => {},
  result: {},
  apiAry: [
    {
      key: 'selectAllUserList',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsHstCmpnyUser',
    },
    {
      key: 'cmpnyList',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsHstCompanyList',
    },
  ],
};
export default List;
