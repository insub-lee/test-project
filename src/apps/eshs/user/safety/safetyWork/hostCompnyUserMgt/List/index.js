/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
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
    const { id, changeFormData } = this.props;

    changeFormData(id, 'userModalType', 'UPDATE');
    changeFormData(id, 'selectedUser', e.rowData);
    changeFormData(id, 'userModal', true);
  };

  noRowsRenderer = () => <div className="noRows">0 명</div>;

  getColumns = () => [
    { label: '소속', dataKey: 'BELONG', width: 350, ratio: 25 },
    { label: '이름', dataKey: 'EMP_NM', width: 200, ratio: 14 },
    { label: '직위', dataKey: 'EMP_POSITION', width: 200, ratio: 12 },
    { label: '직책', dataKey: 'DUTY', width: 200, ratio: 12 },
    { label: '근무지', dataKey: 'SITE', width: 200, ratio: 12 },
    { label: '전화번호', dataKey: 'TEL', width: 350, ratio: 25 },
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
        <div className="selSaveWrapper alignLeft">
          <SearchBar {...this.props} handleAppStart={this.handleAppStart} />
        </div>
        <StyledVirtualizedTable>
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
