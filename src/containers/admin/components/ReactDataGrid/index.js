import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import ScrollBar from 'react-custom-scrollbars';
import StyleDataGrid from 'containers/admin/components/uielements/dataGrid.style';

class ReactDataGridCustom extends Component {
  constructor(prop) {
    super(prop);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const pad = clientHeight / 1.2; // 100px of the bottom
    // t will be greater than 1 if we are about to reach the bottom
    const t = (scrollTop + pad) / (scrollHeight - clientHeight);
    if (t > 1 || scrollTop === scrollHeight - clientHeight) this.props.readMore();
  }

  render() {
    const { columns, rowGetter, onGridSort, rowsCount, rowHeight, emptyRowsView } = this.props;
    return (
      <StyleDataGrid className="globalLang" style={{ height: 'calc(100vh - 317px)' }}>
        <div className="header">
          <ReactDataGrid
            // rowKey="SITE_ID"
            columns={columns}
            rowGetter={() => {}}
            rowsCount={0}
            onGridSort={onGridSort}
            rowHeight={41}
            minHeight={0}
          />
        </div>
        <ScrollBar
          style={{ width: '100%', height: 'calc(100% - 41px)', borderBottom: '1px solid #dadbdb' }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          onUpdate={this.handleUpdate}
        >
          <ReactDataGrid
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={rowsCount}
            emptyRowsView={emptyRowsView}
            headerRowHeight={-1}
            minHeight={rowHeight * rowsCount}
          />
        </ScrollBar>
      </StyleDataGrid>
    );
  }
}

export default ReactDataGridCustom;
