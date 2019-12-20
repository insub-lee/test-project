import React, { PureComponent } from 'react';
import { Button, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ReactDataGrid from 'react-data-grid';
import { Draggable } from 'react-data-grid-addons';
import 'react-sortable-tree/style.css';
import update from 'immutability-helper';
import StyleModal from 'containers/portal/components/Modal/StyleModal';
import basicStyle from 'config/basicStyle';
import IfBoardList from 'components/IfBoardList';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import messages from './messages';
import StyleSelectedApps from './StyleSelectedApps';
import StyleModalBoard from './StyleModalBoard';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyleBoardTree from './StyleBoardTree';

const { RowActionsCell, DropTargetRowContainer } = Draggable;
const RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);

const { colStyle, gutter } = basicStyle;

class IfBoardCfg extends PureComponent {
  constructor(props) {
    super(props);

    this.props.getIfBoardCfgGrpList(''); // 사용자 iflow 그룹 리스트 가져오기

    /* 기존 코드 */
    this.columns = [
      {
        key: 'SORT_SQ',
        name: 'SORT_SQ',
        visible: false,
      },
      {
        key: 'ctName',
        name: 'ctName',
        visible: true,
      },
      {
        key: 'grSeq',
        name: 'grSeq',
        visible: false,
      },
      {
        key: 'ctSeq',
        name: 'ctSeq',
        visible: false,
      },
      {
        key: 'x',
        name: 'x',
        visible: true,
        formatter: this.xMarkFormatter,
        getRowMetaData: data => data,
        width: 30,
      },
    ];
    const { item, type } = this.props;

    const boardSet = item.data;

    if (boardSet.cateList !== undefined) {
      this.state = {
        itemList: item,
        boardSet,
        viewType: item.viewType,
        widgetId: item.WIDGET_ID,
        pageId: item.PAGE_ID,
        cateList: item.data.cateList,
        count: item.data.cateList.length + 1,
        selectedRow: [],
        grKeyword: '',
        ctKeyword: '',
        grSeq: 0,
        checkedList: [], // 조직도 좌측의 트리 체크박스 중 체크된 체크박스 목록을 담고있는 배열
        treeData: [],
        selectGrSeq: 0,
      };
    } else {
      const defContents = new Object();

      defContents.cateList = [];

      this.state = {
        itemList: item,
        boardSet: defContents,
        viewType: item.viewType,
        widgetId: item.WIDGET_ID,
        pageId: item.PAGE_ID,
        cateList: defContents.cateList,
        count: defContents.cateList.length + 1,
        selectedRow: [],
        grKeyword: '',
        ctKeyword: '',
        grSeq: 0,
        checkedList: [], // 조직도 좌측의 트리 체크박스 중 체크된 체크박스 목록을 담고있는 배열
        treeData: [],
        selectGrSeq: 0,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== undefined) {
      const nextItem = nextProps.item;
      // const nextWidgetId = nextProps.widgetID;
      // const nextPageId = nextProps.pageID;
      this.setState({
        itemList: nextItem,
        boardSet: nextItem.data,
        viewType: nextItem.user.viewType,
        // widgetId: nextWidgetId,
        // pageId: nextPageId,
        treeData: nextProps.setIfBoardCfgCateList,
        grSeq: nextProps.grSeq,
      });
    }
  }

  setBoardList = rows => {
    const { itemList, viewType, widgetId, pageId } = this.state;
    const { deleteIfBoardCfg, deleteBizIfBoardCfg, updateBizGroupChgYn, type } = this.props;

    const result = {};
    result.size = itemList.size;
    result.sizeArr = itemList.sizeArr;
    result.user = {};
    result.user.isTitle = itemList.user.isTitle;
    result.user.skin = itemList.user.skin;
    result.user.viewType = viewType;
    const emptyContent = new Object();
    emptyContent.cateList = rows;
    result.data = emptyContent;

    const item = JSON.stringify(result);

    if (type === 'mypage') {
      deleteIfBoardCfg(item, widgetId, pageId);
    } else {
      // 업무그룹
      deleteBizIfBoardCfg(item, widgetId, pageId);
      // 업무 그룹 변화 감지 함수
      updateBizGroupChgYn();
    }
  };

  xMarkFormatter = val => <button onClick={() => this.deleteRows(val.dependentValues.SORT_SQ)} className="delApp" />;

  deleteRows = seq => {
    this.setState({ count: this.state.cateList.length + 1 });
    let rows = this.state.cateList.slice();
    rows = rows.filter(row => row.SORT_SQ !== seq);
    this.keyRearrange(rows);
    this.setState({ count: rows.length + 1, cateList: rows });
    this.setBoardList(rows);
  };

  keyRearrange = rows => {
    const rowData = rows;
    for (let i = 0; i < rowData.length; i += 1) {
      rowData[i].SORT_SQ = i + 1;
    }
    this.setBoardList(rowData);
  };

  // Grid data udpate
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.cateList.slice();
    for (let i = fromRow; i <= toRow; i += 1) {
      const rowToUpdate = rows[i];
      const updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }
    this.props.updateGrid(rows);
  };

  isDraggedRowSelected = (selectedRows, rowDragSource) => {
    if (selectedRows && selectedRows.length > 0) {
      const key = this.state.cateList.rowSeq;
      return selectedRows.filter(r => r[key] === rowDragSource.data[key]).length > 0;
    }
    return false;
  };

  reorderRows = e => {
    if (this.state.cateList.length > 1) {
      const selectedRows = e.rowSource.idx;
      const draggedRows = this.isDraggedRowSelected(selectedRows, e.rowSource) ? selectedRows : [e.rowSource.data];
      const undraggedRows = this.state.cateList.filter(r => draggedRows.indexOf(r) === -1);
      const args = [e.rowTarget.idx, 0].concat(draggedRows);
      Array.prototype.splice.apply(undraggedRows, args);
      this.keyRearrange(undraggedRows);
      this.setState({ cateList: undraggedRows });
    }
  };

  /* 사용하는 펑션 */
  handleOnClickGrp = grSeq => {
    this.props.getIfBoardCfgCateList(grSeq, '');
    this.setState({
      selectGrSeq: grSeq,
      selectedRow: [],
      checkedList: [],
    });
  };

  onCheckChange = (e, node) => {
    let deptIdArr = [];
    deptIdArr = this.state.checkedList.slice();
    deptIdArr.push(node.key);
    this.setState({ checkedList: deptIdArr });

    if (e.target.checked) {
      this.state.selectedRow.push({
        ctSeq: node.ctSeq,
        grSeq: node.grSeq,
        ctName: node.title,
        SORT_SQ: node.SORT_SQ,
      });
    } else {
      /* 삭제 */
      let mapIndex = -1;
      this.state.selectedRow.map((item, index) => (item.ctSeq === node.ctSeq ? (mapIndex = index) : ''));
      if (mapIndex !== -1) {
        const tmpArr = fromJS(this.state.selectedRow).toJS();
        tmpArr.splice(mapIndex, 1);
        this.setState({
          selectedRow: tmpArr,
        });
        const tmpArrChk = fromJS(this.state.checkedList).toJS();
        tmpArrChk.splice(mapIndex, 1);
        this.setState({
          checkedList: tmpArrChk,
        });
      }
    }
  };

  addRow = () => {
    let rows = this.state.cateList.slice();
    const count = this.state.cateList.length;
    let rowUpdateCnt = 0;
    this.state.selectedRow.map((item, index) => {
      let setFlog = true;
      this.state.cateList.map(itemBoard => {
        if (item.grSeq === itemBoard.grSeq && item.ctSeq === itemBoard.ctSeq) {
          setFlog = false;
        }
      });

      if (setFlog) {
        const newRow = {
          SORT_SQ: count + index,
          ctName: item.ctName,
          grSeq: item.grSeq,
          ctSeq: item.ctSeq,
        };
        rows = update(rows, { $push: [newRow] });
        rowUpdateCnt = 1;
      }
    });

    if (rowUpdateCnt > 0) {
      this.props.updateGridData(rows);
      this.setState({ cateList: rows });

      this.setBoardList(rows);
    }
  };

  render() {
    const grList = () =>
      this.props.setIfBoardCfgGrpList.map(item => (
        <li onClick={() => this.handleOnClickGrp(item.grSeq)} style={{ cursor: 'pointer' }} key={item.grSeq}>
          <div style={{ color: item.grSeq === this.state.selectGrSeq ? '#f85023' : '' }}>{item.grName}</div>
        </li>
      ));
    const handleOnClickGrSearch = () => {
      this.props.getIfBoardCfgGrpList(this.state.grKeyword);
    };
    const onChangeGrSearch = val => {
      this.setState({ grKeyword: val.target.value });
    };
    const handleKeyPressGrSearch = val => {
      if (val.key === 'Enter') {
        this.setState({ grKeyword: val.target.value });
        this.props.getIfBoardCfgGrpList(val.target.value);
      }
    };
    const onChangeCtSearch = val => {
      this.setState({ ctKeyword: val.target.value });
    };
    return (
      <div>
        <StyleModal className="modalWrapper inPage">
          <StyleModalBoard className="modalContents">
            <Row gutter={gutter} className="innerBody">
              <Col xl={16} style={colStyle} className="leftActivity">
                <div className="boardGroupList">
                  <h3 className="secTitle noBorder">{intlObj.get(messages.boardGroup)}</h3>
                  {/* 검색 */}
                  <div className="userSearch">
                    <div className="inputWrapper">
                      <Input placeholder={intlObj.get(messages.search)} onChange={onChangeGrSearch} onKeyPress={handleKeyPressGrSearch} />
                      <Button className="searchButton" onClick={handleOnClickGrSearch} />
                    </div>
                  </div>
                  <ul>{grList()}</ul>
                </div>
                <div className="boardList">
                  <h3 className="secTitle noBorder">{intlObj.get(messages.boardList)}</h3>
                  {/* 검색 */}
                  <div className="userSearch">
                    <div className="inputWrapper">
                      <Input placeholder={intlObj.get(messages.search)} onChange={onChangeCtSearch} />
                    </div>
                  </div>
                  <StyleBoardTree>
                    <IfBoardList
                      treeData={this.state.treeData}
                      ctKeyword={this.state.ctKeyword}
                      returnChkChange={this.onCheckChange}
                      grSeq={this.state.grSeq}
                    />
                  </StyleBoardTree>
                </div>
                <Button className="inBtn" onClick={this.addRow} />
              </Col>
              <Col xl={8} style={colStyle} className="rightActivity">
                <StyleSelectedApps>
                  <div className="SUTitle">
                    <h3>{intlObj.get(messages.selectBoard)}</h3>
                  </div>
                  {/* <Button onClick={() => this.setState({ cateList: [], count: 1 })}>전체 삭제</Button> */}
                  {/* 참고: quickmenu(서비스 바로가기) 위젯 환경세팅과 동일한 구성인데,
                      quickmenu에서는 table로 적용함. */}
                  <div className="selectedBoardList">
                    <ReactDataGrid
                      columns={this.columns.filter(column => column.visible === true)}
                      rowGetter={i => this.state.cateList[i]}
                      rowsCount={this.state.cateList.length}
                      headerRowHeight={-1}
                      // minWidth={285}
                      minHeight={465}
                      onGridRowsUpdated={this.handleGridRowsUpdated}
                      rowActionsCell={RowActionsCell}
                      rowRenderer={<RowRenderer onRowDrop={this.reorderRows} />}
                    />
                  </div>
                </StyleSelectedApps>
              </Col>
            </Row>
          </StyleModalBoard>
        </StyleModal>
      </div>
    );
  }
}

IfBoardCfg.propTypes = {
  getIfBoardCfgGrpList: PropTypes.func, //eslint-disable-line
  setIfBoardCfgGrpList: PropTypes.array, //eslint-disable-line
  getIfBoardCfgCateList: PropTypes.func, //eslint-disable-line
  setIfBoardCfgCateList: PropTypes.array, //eslint-disable-line  
  updateGridData: PropTypes.func, //eslint-disable-line
  deleteIfBoardCfg: PropTypes.func, //eslint-disable-line
  deleteBizIfBoardCfg: PropTypes.func, //eslint-disable-line
  grSeq: PropTypes.number, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getIfBoardCfgGrpList: grKeyword => dispatch(actions.getIfBoardCfgGrpList(grKeyword)),
  getIfBoardCfgCateList: (grSeq, ctKeyword) => dispatch(actions.getIfBoardCfgCateList(grSeq, ctKeyword)),
  updateGridData: data => dispatch(actions.updateGridData(data)),
  deleteIfBoardCfg: (item, widgetId, pageId) => dispatch(actions.deleteIfBoardCfg(item, widgetId, pageId)),
  deleteBizIfBoardCfg: (item, widgetId, pageId) => dispatch(actions.deleteBizIfBoardCfg(item, widgetId, pageId)),
});

const mapStateToProps = createStructuredSelector({
  setIfBoardCfgGrpList: selectors.makeIfBoardCfgGrpList(),
  setIfBoardCfgCateList: selectors.makeIfBoardCfgCateList(),
  grSeq: selectors.makeGrseq(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'IfBoardCfg', saga });
const withReducer = injectReducer({ key: 'IfBoardCfg', reducer });

export default compose(withReducer, withSaga, withConnect)(IfBoardCfg);
