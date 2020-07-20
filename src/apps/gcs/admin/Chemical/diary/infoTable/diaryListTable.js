import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const ResizeStyle = styled.div`
  .react-resizable {
    position: relative;
  }

  .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    z-index: 999;
  }
`;

const AntdTable = StyledAntdTable(Table);

const ResizeableTitle = props => {
  const { onResize, width, onClick, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

// Chemical 현황관리 리스트 테이블
class StatusListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '일자',
          dataIndex: 'OCCURDT',
          key: 'OCCURDT',
          width: 70,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(0),
          }),
        },
        {
          title: 'FAB',
          dataIndex: 'FAB',
          key: 'FAB',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(1),
          }),
        },
        {
          title: 'No',
          dataIndex: 'GONGNO',
          key: 'GONGNO',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(2),
          }),
        },
        {
          title: '장치명',
          dataIndex: 'PRODNM',
          key: 'PRODNM',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(3),
          }),
        },
        {
          title: 'DOWN 시간',
          dataIndex: 'DOWNTIME',
          key: 'DOWNTIME',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(4),
          }),
        },
        {
          title: 'UP 시간',
          dataIndex: 'UPTIME',
          key: 'UPTIME',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(5),
          }),
        },
        {
          title: '문제점',
          dataIndex: 'PROBLEM',
          key: 'PROBLEM',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(6),
          }),
        },
        {
          title: '조치사항',
          dataIndex: 'MEASURE',
          key: 'MEASURE',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(7),
          }),
        },
        {
          title: '피해',
          dataIndex: 'DAMAGE',
          key: 'DAMAGE',
          width: 50,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(8),
          }),
        },
        {
          title: '작업자',
          dataIndex: 'OWNID',
          key: 'OWNID',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(9),
          }),
        },
        {
          title: '비고',
          dataIndex: 'BIGO',
          key: 'BIGO',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(10),
          }),
        },
        {
          title: '통보여부',
          dataIndex: 'EQUIPNOTI',
          key: 'EQUIPNOTI',
          width: 100,
          align: 'center',
          ellipsis: true,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(11),
          }),
        },
      ],
    };
  }

  componentWillUpdate(nextProps) {
    const { listData } = this.props;
    if (listData !== nextProps.listData) {
      const strList = listData.toString();
      const strNextList = nextProps.listData.toString();
      if (strList.length !== strNextList.length) return true;
    }
    return false;
  }

  handleResize = index => (e, { size }) => {
    const { columns } = this.state;
    const nextColumns = columns;
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    this.setState({
      columns: nextColumns,
    });
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  render() {
    const { columns } = this.state;
    const { listData, handleModal } = this.props;

    return (
      <ResizeStyle>
        <AntdTable
          bordered
          pagination={{
            pageSize: 50,
          }}
          columns={columns}
          components={this.components}
          dataSource={listData}
          scroll={{ x: 1600, y: 550 }}
          onRow={record => ({
            onClick: () => handleModal('MODIFY', true, record), // click row
          })}
        />
      </ResizeStyle>
    );
  }
}

StatusListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

StatusListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default StatusListTable;
