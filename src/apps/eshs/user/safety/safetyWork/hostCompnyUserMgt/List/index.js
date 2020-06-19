/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledVirtualizedTable from 'components/BizBuilder/styled/Table/StyledVirtualizedTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

import SearchBar from './SearchBar';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  handleAppStart = () => {
    const { result, id, changeFormData } = this.props;
    const userList = (result && result.selectAllUserList && result.selectAllUserList.list) || [];
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    changeFormData(id, 'cmpnyList', cmpnyList);
    this.setState({
      userList,
    });
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
    const { id, formData, setFormData } = this.props;

    setFormData(id, { ...formData, userModalType: 'UPDATE', selectedUser: e.rowData, userModal: true });
  };

  noRowsRenderer = () => <div className="noRows"></div>;

  getColumns = () => [
    { label: '소속', dataKey: 'BELONG', width: 350, ratio: 31 },
    { label: '이름', dataKey: 'EMP_NM', width: 200, ratio: 17 },
    { label: '직위', dataKey: 'EMP_POSITION', width: 200, ratio: 13 },
    { label: '근무지', dataKey: 'SITE', width: 200, ratio: 13 },
    { label: '전화번호', dataKey: 'TEL', width: 350, ratio: 26 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  render() {
    const list = this.setList();
    return (
      <ContentsWrapper>
        <SearchBar {...this.props} handleAppStart={this.handleAppStart} />

        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={700}
                headerHeight={40}
                rowHeight={53}
                rowCount={list.length}
                rowGetter={({ index }) => list[index]}
                noRowsRenderer={this.noRowsRenderer}
                onRowClick={this.onRowClick}
                style={{ cursor: 'pointer' }}
              >
                {this.getColumns().map(({ label, dataKey, ratio }) => (
                  <Column key={dataKey} label={label} dataKey={dataKey} width={(width / 100) * ratio} />
                ))}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualizedTable>
      </ContentsWrapper>
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
