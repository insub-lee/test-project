import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as constants from './constants';
import BoardsStyle from './boardStyle';
import { WIDGET } from 'utils/constants'

const TabPane = Tabs.TabPane;
let pageNum = 1;
let pageEnum = 20;
const pageIndex = 20;
// const empty = [];

class IfBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'arTitle',
        name: 'TITLE',
        formatter: this.HyperlinkFormatter,
        getRowMetaData: data => data,
      },
    ];
    const { item } = this.props;

    const boardSet = item.data;
    if (boardSet.cateList !== undefined) {
      this.state = {
        itemList: item,
        boardSet: boardSet,
        cateList: item.data.cateList,
        tabNum: '1',
      };
      this.props.getIfBoardDataList(boardSet.cateList, pageNum, pageIndex);
    } else {
      let defContents = new Object();
      defContents.cateList = [
        {
          SORT_SQ: 1,
          ctName: 'CUBE 활용 팁',
          grSeq: 84,
          ctSeq: 1545,
        },
        {
          SORT_SQ: 2,
          ctName: 'Inteligence Flow',
          grSeq: 84,
          ctSeq: 1761,
        },
        {
          SORT_SQ: 3,
          ctName: 'FAQ',
          grSeq: 84,
          ctSeq: 1546,
        },
      ];
      this.state = {
        itemList: item,
        boardSet: defContents,
        cateList: defContents.cateList,
        tabNum: '1',
      };
      this.props.getIfBoardDataList(defContents.cateList, pageNum, pageIndex);
    }
    // this.props.getIfBoardDataList(defContents.cateList, pageNum, pageIndex);
  }

  onClickOpen = (url) => {
    window.open(url);
  }

  HyperlinkFormatter = (val) => {
    const url = `${constants.IFLOW_URL}/group/article/${val.dependentValues.arSeq}`;
    const replyIcon = (
      <span className="replyIcon" />
    );
    return (
      <div>
        <span
          title={val.dependentValues.arTitle}
          onClick={() => this.onClickOpen(url)}
          className="titleText ellipsis"
        >
          {val.dependentValues.arTitle}
        </span>
        <span className="subInfo">
          by {val.dependentValues.empName} <i className="div"> | </i> {val.dependentValues.regDt.split(' ')[0]}  {val.dependentValues.cntReply !== 0 ? replyIcon : ''}
        </span>
      </div>
    );
  };
  handleTabClicks = (num) => {
    this.setState({ tabNum: num });
  }

  render() {
    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">게시된 글이 없습니다.</p>
      </div>
    );

    const wgHeight = Number(this.props.item.size.split('X')[1]);
    const wgTitleHeight = this.props.item.user.isTitle ? 35 : 0;
    const rowHeight = 44;

    const boardTab = () => {
      return this.props.setIfBoardDataList.map((item, i) => (
        <TabPane tab={this.state.cateList[i].ctName} key={i + 1}>
          <ReactDataGrid
            columns={this.columns}
            rowGetter={(j) => {
              if (j === pageEnum - 1) {
                pageNum += 1;
                pageEnum += pageIndex;
                this.props.getIfBoardDataList(item.data.cateList, pageNum, pageIndex);
              }
              return item[j]
            }}
            rowsCount={item.length}
            rowHeight={rowHeight}
            scrollHeight={wgHeight * 270 - wgTitleHeight} // 슬림스크롤 높이
            minHeight={rowHeight * item.length} // 위젯 row 전체 높이
            emptyRowsView={EmptyData}
          />
        </TabPane>
      ));
    };

    return (
      <BoardsStyle className="board">
        <Tabs defaultActiveKey="1"
          activeKey={this.state.tabNum}
          onTabClick={this.handleTabClicks}
        // onNextClick={this.handleTabNextClick}
        >
          {boardTab()}
        </Tabs>
      </BoardsStyle>
    );
  }
}

IfBoard.propTypes = {
  getIfBoardDataList: PropTypes.func, //eslint-disable-line
  setIfBoardDataList: PropTypes.Array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getIfBoardDataList: (cateList, pageNum, pageIndex) => dispatch(actions.getIfBoardDataList(cateList, pageNum, pageIndex)),
});

const mapStateToProps = createStructuredSelector({
  setIfBoardDataList: selectors.makeIfBoardDataList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'IfBoardSys', saga });
const withReducer = injectReducer({ key: 'IfBoardSys', reducer, mode: WIDGET });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IfBoard);
