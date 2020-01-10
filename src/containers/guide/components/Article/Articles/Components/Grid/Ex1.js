import React, { Component } from 'react';
import ReactDataGrid from 'components/ReactDataGrid';
import fakeData from './fakeData';

class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      columns: [
        {
          key: 'id',
          name: 'ID',
        },
        {
          key: 'title',
          name: 'Title',
          editable: true /* row편집가능 */,
          resizable: true /* row사이즈조절 */,
        },
        {
          key: 'count',
          name: 'Count',
          editable: true /* row편집가능 */,
          resizable: true /* row사이즈조절 */,
        },
      ],
      rows: fakeData.rows.toJS(),
    };
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i += 1) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    const { columns, rows } = this.state;
    return (
      <ReactDataGrid
        columns={columns} // header
        rowGetter={i => rows[i]} // get row
        rowsCount={rows.length}
        minHeight={150}
        enableCellSelect // row편집가능
        onGridRowsUpdated={this.onGridRowsUpdated} // 편집 후 enter, 입력창 외 클릭 시 저장함수
      />
    );
  }
}

const code = `import React, { Component } from 'react';
import ReactDataGrid from 'components/ReactDataGrid';
import fakeData from './fakeData';

class App extends Component {
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

import { fromJS } from 'immutable';

// 임시데이터
const rows = fromJS([
  {
    id: 0, title: 'row1', count: 20,
  },
  {
    id: 1, title: 'row2', count: 40,
  },
  {
    id: 2, title: 'row3', count: 60,
  },
  {
    id: 3, title: 'row4', count: 80,
  },
  {
    id: 4, title: 'row5', count: 100,
  },
  {
    id: 5, title: 'row6', count: 60,
  },
  {
    id: 6, title: 'row7', count: 60,
  },
  {
    id: 7, title: 'row8', count: 60,
  },
  {
    id: 8, title: 'row9', count: 60,
  },
  {
    id: 9, title: 'row10', count: 60,
  },
]);

const fakeData = {
  rows,
};

export default fakeData;
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
