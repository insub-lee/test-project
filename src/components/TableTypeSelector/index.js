import * as PropTypes from 'prop-types';
import React from 'react';
import { Table, Modal, Icon, Input, message, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

// Component Attribute 및 Event Method 정리
// <TableTypeSelector
//  rightTableColumns={rightTableColumns}
//  leftTableColumns={leftTableColumns}
//  applyList={applyList}  ---- 적용시 반환되는 right 테이블 데이터
//  apiList={apiList}   ---- left테이블 데이터
//  btnText="구성성분 등록"  ---- 버튼 텍스트
//  handleApply={this.handleApply}  ---- 적용시 applyList가 반환된다.
//  modalTitle="MSDS 검색"  ---- modal title
//  rowKey="TASK_SEQ"  ---- leftTableRowKey, RightTableRowKey
//  />

// TableColumns 요소중 search - antd의 Table Column Search 사용할 것인가 지정.
// leftTableColumns: [
//   { dataIndex: 'MTRL_NM', title: '물질명', search: true, width: 150 },
//   { dataIndex: 'COMPONENT_ITEM_CD', title: 'MSDS코드', search: true, width: 90 },
//   { dataIndex: 'MOLECULAR_FORMULA', title: '분자식', search: true, width: 200 },
//   { dataIndex: 'CAS_NO', title: 'CAS-NO', search: true, width: 150 },
//   { dataIndex: 'UN_NO', title: 'UN-NO', search: true, width: 100 },
//   { dataIndex: 'ITEM_NM', title: '제품명', search: true, width: 200

//   { dataIndex: 'MOLECULAR_FORMULA', title: '분자식' },
//   { dataIndex: 'CAS_NO', title: 'CAS-NO' },
// ]
//
const AntdTable = StyledAntdTable(Table);
const AntdModalPad = StyledAntdModalPad(Modal);

class TableTypeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisivle: false,
      deleteSeqs: [],
      selectedRows: [],
      searchText: '',
      searchedColumn: '',
      applyList: [],
      leftTableColumnsSearchVersion: [],
      selectedRowKeys: [],
    };
  }

  componentDidMount = () => {
    const { leftTableColumns } = this.props;
    const leftTableColumnsSearchVersion = leftTableColumns.map(l => (l.search ? { ...l, ...this.getColumnSearchProps(`${l.dataIndex}`) } : { ...l }));
    this.setState({
      leftTableColumnsSearchVersion,
    });
  };

  handleModalVisible = () => {
    const { modalVisivle } = this.state;
    const { applyList, customVisible, customWarning } = this.props;
    if (typeof customVisible === 'string') {
      if (customVisible) {
        this.setState({
          applyList,
          searchText: '',
          searchedColumn: '',
          modalVisivle: !modalVisivle,
          selectedRows: [],
          selectedRowKeys: [],
          deleteSeqs: [],
        });
      } else {
        message.warning(customWarning);
      }
    } else {
      this.setState({
        applyList,
        searchText: '',
        searchedColumn: '',
        modalVisivle: !modalVisivle,
      });
    }
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
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
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onRightClick = () => {
    const { rowKey } = this.props;
    const { selectedRows, applyList, selectedRowKeys } = this.state;
    const noOverlapRow = applyList.filter(a => selectedRowKeys.indexOf(a[`${rowKey}`]) < 0);
    const rightList = selectedRows.concat(noOverlapRow);
    this.setState({
      applyList: rightList,
    });
  };

  onLeftClick = () => {
    const { rowKey } = this.props;
    const { applyList, deleteSeqs } = this.state;
    const stayList = applyList.filter(r => deleteSeqs.indexOf(r[`${rowKey}`]) < 0);

    this.setState({
      applyList: stayList,
    });
  };

  handleModalOk = () => {
    const { handleApply } = this.props;
    const { applyList } = this.state;
    handleApply(applyList);
    this.handleModalVisible();
  };

  render() {
    const { rightTableColumns, apiList, btnText, modalTitle, rowKey } = this.props;
    const { modalVisivle, applyList, leftTableColumnsSearchVersion } = this.state;
    const leftrowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows,
          selectedRowKeys,
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
      fixed: true,
    };
    const rightrowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          deleteSeqs: selectedRowKeys,
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
      fixed: true,
    };
    return (
      <>
        <StyledButton className="btn-primary btn-first" onClick={this.handleModalVisible}>
          {btnText}
        </StyledButton>

        <AntdModalPad
          title={modalTitle}
          visible={modalVisivle}
          width={870}
          height={520}
          onCancel={this.handleModalVisible}
          onOk={this.handleModalOk}
          okText="적용"
          footer={[null]}
        >
          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <colgroup>
              <col width="60%" />
              <col width="7%" />
              <col width="35%" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <AntdTable
                    size="small"
                    key="leftTable"
                    className="ant-table-checkbox"
                    rowSelection={leftrowSelection}
                    columns={leftTableColumnsSearchVersion}
                    dataSource={apiList}
                    // style={{ width: '100%' }}
                    scroll={{ x: '400px', y: '240px' }}
                    rowKey={`${rowKey}`}
                    pagination={false}
                    locale={{ emptyText: this.props.noDataText }}
                  ></AntdTable>
                </td>
                <td style={{ padding: '0 10px' }}>
                  <div style={{ marginBottom: '5px' }}>
                    <Button size="small" onClick={this.onRightClick}>
                      <span>
                        <Icon type="right" />
                      </span>
                    </Button>
                  </div>
                  <div>
                    <Button size="small" onClick={this.onLeftClick}>
                      <span>
                        <Icon type="left" />
                      </span>
                    </Button>
                  </div>
                  <div>&nbsp;</div>
                </td>
                <td>
                  <AntdTable
                    size="small"
                    className="ant-table-checkbox"
                    rowSelection={rightrowSelection}
                    columns={rightTableColumns}
                    dataSource={applyList}
                    pagination={false}
                    // style={{ width: '100%' }}
                    scroll={{ x: '100px', y: '240px' }}
                    rowKey={`${rowKey}`}
                  ></AntdTable>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                    <StyledButton className="btn-primary mr5" onClick={this.handleModalOk}>
                      적용
                    </StyledButton>
                    <StyledButton className="btn-light" onClick={this.handleModalVisible}>
                      취소
                    </StyledButton>
                  </StyledButtonWrapper>
                </td>
              </tr>
            </tbody>
          </table>
        </AntdModalPad>
      </>
    );
  }
}

TableTypeSelector.propTypes = {
  leftTableColumns: PropTypes.array,
  rightTableColumns: PropTypes.array,
  apiList: PropTypes.array,
  applyList: PropTypes.array,
  handleApply: PropTypes.func,
  btnText: PropTypes.string,
  modalTitle: PropTypes.string,
};

export default TableTypeSelector;
