import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import ReactDataGridWrapper from './StyleGrid';

// 조직도, 사용자 목록

class categoryGrid extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        key: 'GRID_DATA',
        name: '',
        resizable: true,
        width: 275,
      },
    ];

    this.state = {
      selectedIndexes: [],
      selectedCategory: [],
      //   isAddedScrollEvent: false,
    };
  }

  render() {
    const { categoryList, checkBoxStat, resetCheckbox } = this.props;

    const { selectedCategory } = this.state;

    if (checkBoxStat) {
      // 전체 체크박스 초기화
      this.grid.selectAllCheckbox.checked = false;

      this.setState({
        selectedIndexes: [],
        selectedCategory: [],
      });
      resetCheckbox(false);
    }

    const rowGetter = i => {
      if (categoryList[i] !== undefined) {
        const content = {
          GRID_DATA: [
            <div title={categoryList[i].NAME_KOR}>
              <div className="listDivImg">
                <img
                  className="listImg"
                  style={{ height: '100%', width: '100%' }}
                  src={imgUrl.get('120x120', categoryList[i].ICON)}
                  onError={e => {
                    e.target.src = '/app_icon/icon_no_image.png';
                  }}
                  alt="app icon"
                />
              </div>
              <div
                style={{
                  display: 'inline-block',
                  width: 245,
                  fontSize: 12,
                  lineHeight: '1.3em',
                  verticalAlign: 'middle',
                }}
                className="contents"
              >
                {categoryList[i].NAME_KOR}
                <br />
                <div className="ellipsis" style={{ width: 245 }}>
                  {categoryList[i].DSCR_KOR}
                </div>
              </div>
            </div>,
          ],
          categoryList: categoryList[i],
        };
        if (i === this.props.pageNum - 1) {
          this.props.paging();
        }
        return content;
      }
    };

    const getColumns = () => {
      const clonedColumns = this.columns.slice();

      return clonedColumns;
    };

    const onRowsSelected = rows => {
      this.setState({
        selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
      });
      for (let i = 0; i < rows.length; i += 1) {
        selectedCategory.push(rows[i].row.categoryList);
      }
      this.props.onLoadCategory(selectedCategory);
    };

    const onRowsDeselected = rows => {
      const rowIndexes = rows.map(r => r.rowIdx);
      const caID = rows.map(r => r.row.categoryList.APP_ID);
      this.setState({
        selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
      });
      for (let i = 0; i < rows.length; i += 1) {
        const idx = selectedCategory.findIndex(s => s.APP_ID === caID[i]);
        selectedCategory.splice(idx, 1);
      }
      this.props.onLoadCategory(selectedCategory);
    };

    return (
      <ReactDataGridWrapper>
        <ReactDataGrid
          ref={node => {
            this.grid = node;
          }}
          rowKey="CATG_ID"
          columns={getColumns()}
          rowGetter={rowGetter}
          rowsCount={categoryList.length}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected,
            onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes,
            },
          }}
          rowHeight={45}
        />
      </ReactDataGridWrapper>
    );
  }
}

categoryGrid.propTypes = {
  categoryList: PropTypes.array.isRequired,
  checkBoxStat: PropTypes.string.isRequired,
  resetCheckbox: PropTypes.func.isRequired,
  onLoadCategory: PropTypes.func.isRequired,
};

export default categoryGrid;
