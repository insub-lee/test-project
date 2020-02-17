/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Modal } from 'antd';
import { Table, Column, AutoSizer } from 'react-virtualized';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import NothGateCmpnyModal from '../NothGateCmpnyModal';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordList: [],
      nothGateModal: false,
      type: '',
    };
  }

  handleAppStart = () => {
    const { result, id, changeFormData } = this.props;
    const recordList = (result && result.recordList && result.recordList.recordList) || [];
    this.setState({
      recordList,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry, this.handleAppStart);
  };

  onRowClick = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'rowData', (e && e.rowData) || {});
    console.debug('onRowClick ', e);
  };

  noRowsRenderer = () => <div className="noRows">0 명</div>;

  getColumns = () => [
    { label: '지역', dataKey: 'work_area_cd', width: 120, ratio: 8 },
    { label: '일자', dataKey: 'visit_date', width: 180, ratio: 12 },
    { label: '업체명', dataKey: 'wrk_cmpny_nm', width: 300, ratio: 20 },
    { label: '사업자등록번호', dataKey: 'biz_reg_no', width: 255, ratio: 17 },
    { label: '이름', dataKey: 'visitor_name', width: 150, ratio: 10 },
    { label: '출입시간', dataKey: 'visitor_in_date', width: 120, ratio: 8 },
    { label: '퇴장시간', dataKey: 'visitor_out_date', width: 120, ratio: 8 },
    { label: '출입구분', dataKey: 'visitor_type', width: 120, ratio: 8 },
    { label: '업체등록여부', dataKey: 'wrk_reg', width: 135, ratio: 9 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  handleModalOpen = () => {
    this.setState({
      nothGateModal: true,
    });
  };

  handleOk = () => {
    this.setState({
      nothGateModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      nothGateModal: false,
    });
  };

  render() {
    // const list = this.setList();
    const { recordList } = this.state;
    const { nothGateModal } = this.state;
    return (
      <div>
        <StyledButton classNmae="btn-gray btn-first" onClick={this.handleModalOpen}>
          등록
        </StyledButton>
        <StyledButton classNmae="btn-gray">검색</StyledButton>
        <StyledButton classNmae="btn-gray">액셀받기</StyledButton>
        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={500}
                headerHeight={40}
                rowHeight={53}
                rowCount={recordList.length}
                rowGetter={({ index }) => recordList[index]}
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
        <Modal title="북문 업체등록" visible={nothGateModal} onOk={this.handleOk} onCancel={this.handleCancel} width={900} height={600}>
          <NothGateCmpnyModal {...this.props} />
        </Modal>
      </div>
    );
  }
}

List.defaultProps = {
  id: 'EshsAccAccRecord',
  getCallDataHanlder: () => {},
  result: {},
  apiAry: [
    {
      key: 'recordList',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsAccessRecord',
    },
  ],
};
export default List;
