import React, { Component } from 'react';
import ReactDataGrid from 'components/ReactDataGrid';
import fakeData from './fakeData';

class Example extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      columns: [
        {
          key: 'id', name: 'ID',
        },
        {
          key: 'title', name: 'Title', editable: true /* row편집가능 */, resizable: true /* row사이즈조절 */,
        },
        {
          key: 'count', name: 'Count', editable: true /* row편집가능 */, resizable: true /* row사이즈조절 */,
        },
      ],
      rows: fakeData.rows.toJS(),
    };
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i += 1) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    const {
      columns,
      rows,
    } = this.state;
    return (
      <ReactDataGrid
        columns={columns} // header
        rowGetter={i => rows[i]} // get row
        rowsCount={rows.length}
        minHeight={150}
        enableCellSelect={true} // row편집가능
        onGridRowsUpdated={this.onGridRowsUpdated} // 편집 후 enter, 입력창 외 클릭 시 저장함수
      />
    );
  }
}

export default Example;
