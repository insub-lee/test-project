/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Table, Column, AutoSizer } from 'react-virtualized';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

class NothGateCmpnyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nothGateCmpnyList: [],
    };
  }

  handleAppStart = () => {
    const { result } = this.props;
    const nothGateCmpnyList = (result && result.NothGateCmpnyList && result.NothGateCmpnyList.List) || [];
    this.setState({
      nothGateCmpnyList,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHanlder } = this.props;
    const apiAry = [
      {
        key: 'NothGateCmpnyList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsNothGateCmpnyList',
      },
    ];
    getCallDataHanlder(id, apiAry, this.handleAppStart);
  };

  onRowClick = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'rowData', (e && e.rowData) || {});
    console.debug('onRowClick ', e);
  };

  noRowsRenderer = () => <div className="noRows"> </div>;

  getColumns = () => [
    { label: '사업자등록번호', dataKey: 'biz_reg_no', width: 220, ratio: 25 },
    { label: '업체명', dataKey: 'wrk_cmpny_nm', width: 310, ratio: 35 },
    { label: '사업장주소', dataKey: 'address', width: 355, ratio: 40 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  handleModalOpen = () => {
    this.setState = {};
  };

  render() {
    // const list = this.setList();
    const { nothGateCmpnyList } = this.state;
    return (
      <div>
        <table></table>
        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={500}
                headerHeight={40}
                rowHeight={53}
                rowCount={nothGateCmpnyList.length}
                rowGetter={({ index }) => nothGateCmpnyList[index]}
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

NothGateCmpnyModal.defaultProps = {
  id: 'EshsAccAccRecord',
  getCallDataHanlder: () => {},
  result: {},
};
export default NothGateCmpnyModal;
