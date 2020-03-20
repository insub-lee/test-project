import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Table, DatePicker, Input, Button, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import moment from 'moment';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import Highlighter from 'react-highlight-words';
import BizBuilderBase from 'components/BizBuilderBase';
import { SearchOutlined } from '@ant-design/icons';

const AntdTable = StyledAntdTable(Table);
const { RangePicker } = DatePicker;

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [moment(), moment()],
      dateStrings: [],
      takeOutList: [],
      taskSeq: -1,
      modal: false,
    };
  }

  componentDidMount() {}

  searchData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { dateStrings } = this.state;
    const apiAry = [
      {
        key: 'TakeOutList',
        url: `/api/eshs/v1/common/eshsTakeOutList?FROM_DATE=${dateStrings[0] || ''}&TO_DATE=${dateStrings[1] || ''}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.searchDataSet);
  };

  searchDataSet = () => {
    const { result } = this.props;
    this.setState({ takeOutList: result && result.TakeOutList && result.TakeOutList.list });
  };

  selectedRecord = record => {
    this.setState({ taskSeq: record.TASK_SEQ }, () => this.handleModalVisible());
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  renderBuilder = () => (
    <BizBuilderBase sagaKey="takeOutModal" workSeq={4781} taskSeq={this.state.taskSeq} viewType="VIEW" loadingComplete={this.loadingComplete} />
  );

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
          icon={<SearchOutlined />}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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

  print = () => {
    message.info('개발중입니다.');
  };

  render() {
    const { takeOutList } = this.state;
    const { columns } = this.props;
    const nColumns = columns.map(nItem => ({ ...nItem, ...this.getColumnSearchProps(nItem.dataIndex) }));
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <RangePicker
                defaultValue={this.state.dates}
                format={['YYYY-MM-DD', 'YYYY-MM-DD']}
                onChange={(date, dateStrings) => this.dateChange(dateStrings)}
              />
              <StyledButton onClick={this.searchData}>검색</StyledButton>
              <StyledButton onClick={this.print}>인쇄</StyledButton>
              <AntdTable
                style={{ cursor: 'pointer' }}
                rowKey={takeOutList && takeOutList.TASK_SEQ}
                columns={nColumns}
                dataSource={takeOutList || []}
                bordered
                onRow={record => ({
                  onClick: () => {
                    this.selectedRecord(record);
                  },
                })}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 600 }}
                footer={() => <div style={{ textAlign: 'center' }}>{`${takeOutList && takeOutList.length} 건`}</div>}
              />
              <Modal visible={this.state.modal} width={800} height={600} onCancel={this.handleModalVisible} footer={[null]}>
                {this.state.modal && this.renderBuilder()}
              </Modal>
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {
  columns: PropTypes.array,
  result: PropTypes.any,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    { dataIndex: 'TAKEOUT_CD', title: '반출증번호' },
    { dataIndex: 'ITEM_NM', title: '품목명' },
    { dataIndex: 'PRICE_WEIGH', title: '반출량' },
    { dataIndex: 'STATUS', title: '결제상태' },
    { dataIndex: 'TAKEOUT_DT', title: '반출일자' },
    { dataIndex: 'WRK_CMPNY_NM', title: '운반업체' },
  ],
};

export default List;
