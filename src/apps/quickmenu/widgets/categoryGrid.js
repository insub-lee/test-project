import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDataGrid from 'react-data-grid';
import ReactDataGridWrapper from '../../../containers/portal/components/Organization/StyleGrid';

// 조직도, 사용자 목록

let selectedCategory = [];

class categoryGrid extends Component {
    constructor(props) {
        super(props);

        // 사용자 목록 컬럼
        this.columns = [
            {
                key: 'GRID_DATA',
                name: '',
                resizable: true,
                width: 329,
            }
        ];

        this.state = {
            selectedIndexes: [],
            selectedCategory: [],
            // onScroll 이벤트 추가 후 true로 변경
            // 단지 componentDidUpdate를 호출 하기 위한 트리거 역할
            isAddedScrollEvent: false,
        };
    }

    render() {

        // 사용자 목록
        // let { categoryList, handleInitializeCheckbox, emptyRowsView, scrollTopFlag, loadingGridDataFunctions, scrollTop } = this.props;

        let { categoryList, checkBoxStat, resetCheckbox } = this.props;

        // const {
        //   organizationSearchResult,
        //   checkboxInitialize,
        // } = this.props;

        const { selectedIndexes, selectedCategory } = this.state;

        if (checkBoxStat) {
            // 전체 체크박스 초기화
            this.grid.selectAllCheckbox.checked = false;

            // 구성원별 체크박스 초기화
            this.setState({
                selectedIndexes: [],
                selectedCategory: [],
            });
            resetCheckbox(false);
        }

        // if (organizationSearchResult.length !== 0) {
        //   users = organizationSearchResult;
        // }

        // if (this.grid && this.grid.base.viewport) {
        //   this.grid.base.viewport.canvas.canvas.scrollTop = scrollTop;
        // }

        // if (scrollTopFlag && this.grid && this.grid.base.viewport) {
        //   const canvas = this.grid.base.viewport.canvas;
        //   canvas.canvas.scrollTop = 0;
        //   loadingGridDataFunctions.backScrollTopFlag();
        // }

        const rowGetter = (i) => {
            if (categoryList[i] !== undefined) {
                const content = {
                    GRID_DATA: [
                        <div title={categoryList[i].NAME_KOR}>
                            <div className="listDivImg">
                                <img
                                    className="listImg"
                                    style={{ height: '100%', width: '100%' }}
                                    src={categoryList[i].ICON}
                                    onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
                                    alt="" />
                            </div>
                            <div
                                style={{
                                    display: 'inline-block',
                                    fontSize: '12px',
                                    lineHeight: '1.3em',
                                    verticalAlign: 'middle'
                                }}
                                className="contents"
                            >
                                {categoryList[i].NAME_KOR}<br />
                                <div className="ellipsis">
                                    {categoryList[i].DSCR_KOR}
                                </div>
                            </div>
                        </div>
                    ],
                    categoryList: categoryList[i],
                };
                return content;
            }
        }

        const getColumns = () => {
            const clonedColumns = this.columns.slice();

            return clonedColumns;
        };

        const onRowsSelected = (rows) => {
            this.setState({
                selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
            });
            for (let i = 0; i < rows.length; i++) {
                selectedCategory.push(rows[i].row.categoryList);
            }
            this.props.onLoadCategory(selectedCategory);
        };

        const onRowsDeselected = (rows) => {
            let rowIndexes = rows.map(r => r.rowIdx);
            let caID = rows.map(r => r.row.categoryList.APP_ID);//40
            this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
            for (let i = 0; i < rows.length; i++) {
                let idx = selectedCategory.findIndex(s => s.APP_ID === caID[i]);
                selectedCategory.splice(idx, 1)
            }
            this.props.onLoadCategory(selectedCategory);
        };

        return (
            <ReactDataGridWrapper>
                <ReactDataGrid
                    ref={node => this.grid = node}
                    rowKey="CATG_ID"
                    columns={getColumns()}
                    rowGetter={rowGetter}
                    rowsCount={categoryList.length}
                    // minHeight={350}
                    //minWidth={386}
                    rowSelection={{
                        showCheckbox: true,
                        enableShiftSelect: true,
                        onRowsSelected: onRowsSelected,
                        onRowsDeselected: onRowsDeselected,
                        selectBy: {
                            indexes: this.state.selectedIndexes,
                        }
                    }}
                    //   emptyRowsView={emptyRowsView}
                    rowHeight={45}
                />
            </ReactDataGridWrapper>
        );
    }
}

categoryGrid.propTypes = {

};

export default categoryGrid;
