import React from 'react';
import PropTypes from 'prop-types';
import 'react-virtualized/styles.css';
import { Column, Table } from 'react-virtualized';

const TOTAL_WIDTH = 1000;

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widths: {
        row: 0.05,
        date: 0.1,
        area: 0.05,
        type: 0.05,
        shift: 0.05,
        content: 0.2,
        usernm: 0.05,
        status: 0.1,
        actDate: 0.1,
        actContent: 0.2,
        actUsernm: 0.05,
      },
    };
    this.resizeRow = this.resizeRow.bind(this);
  }

  resizeRow({ dataKey, deltaX }) {
    this.setState(prevState => {
      const prevWidths = prevState.widths;
      const percentDelta = deltaX / TOTAL_WIDTH;

      let nextDataKey = '';
      switch (dataKey) {
        case 'row':
          nextDataKey = 'date';
          break;
        case 'date':
          nextDataKey = 'area';
          break;
        case 'area':
          nextDataKey = 'type';
          break;
        case 'type':
          nextDataKey = 'shift';
          break;
        case 'shift':
          nextDataKey = 'content';
          break;
        case 'content':
          nextDataKey = 'usernm';
          break;
        case 'usernm':
          nextDataKey = 'status';
          break;
        case 'status':
          nextDataKey = 'actDate';
          break;
        case 'actDate':
          nextDataKey = 'actContent';
          break;
        case 'actContent':
          nextDataKey = 'actUsernm';
          break;
        case 'actUsernm':
          break;
        default:
          break;
      }

      return {
        widths: {
          ...prevWidths,
          [dataKey]: prevWidths[dataKey] + percentDelta,
          [nextDataKey]: prevWidths[nextDataKey] - percentDelta,
        },
      };
    });
  }

  render() {
    const { list } = this.props;
    const { widths } = this.state;

    return (
      <div>
        <Table
          width={TOTAL_WIDTH}
          height={300}
          headerHeight={30}
          rowHeight={40}
          rowCount={list.length}
          rowGetter={({ index }) => list[index]}
          headerStyle={{
            textAlign: 'center',
          }}
          gridStyle={{
            width: '100%',
          }}
        >
          <Column
            label="No"
            dataKey="row"
            width={widths.row * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
            cellRenderer={({ rowIndex }) => <span>{rowIndex}</span>}
          />
          <Column
            label="요청날짜"
            dataKey="date"
            width={widths.date * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
          <Column
            label="area"
            dataKey="area"
            width={widths.area * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
          <Column
            label="분류"
            dataKey="type"
            width={widths.type * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
          <Column
            label="shift"
            dataKey="shift"
            width={widths.shift * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
          <Column
            label="개선요청사항"
            dataKey="content"
            width={widths.content * TOTAL_WIDTH}
            style={{
              textAlign: 'left',
            }}
          />
          <Column
            label="요청자"
            dataKey="usernm"
            width={widths.usernm * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
          <Column
            label="조치상태"
            dataKey="status"
            width={widths.status * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
          <Column
            label="조치날짜"
            dataKey="actDate"
            width={widths.actDate * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />

          <Column
            label="조치내용"
            dataKey="actContent"
            width={widths.actContent * TOTAL_WIDTH}
            style={{
              textAlign: 'left',
            }}
          />
          <Column
            label="조치자"
            dataKey="actUsernm"
            width={widths.actUsernm * TOTAL_WIDTH}
            style={{
              textAlign: 'center',
            }}
          />
        </Table>
        <div style={{ textAlign: 'right', padding: 10 }}>
          <strong>{`Total: ${list.length}`}</strong>
        </div>
      </div>
    );
  }
}

DataTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

DataTable.defaultProps = {
  list: [],
};

export default DataTable;
