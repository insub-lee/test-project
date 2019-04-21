import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import { intlObj } from 'utils/commonUtils';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import BoardsStyle from './boardStyle';
import ApplyPageStyle from './applyPageStyle.js';

const TabPane = Tabs.TabPane;
const pagepernum = 20; // 페이징 단위

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
        boardDataList: [],
        catePageList: [],
        widgetId: item.WIDGET_ID,
      };
      this.props.getIfBoardDataList(boardSet.cateList, 1, pagepernum, this.state.widgetId);
    } else {
      let defContents = new Object();
      defContents.cateList = [];
      this.state = {
        itemList: item,
        boardSet: defContents,
        cateList: defContents.cateList,
        tabNum: '1',
        boardDataList: [],
        catePageList: [],
        widgetId: item.WIDGET_ID,
      };
      this.props.getIfBoardDataList(defContents.cateList, 1, pagepernum, this.state.widgetId);
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.setIfBoardDataList !== nextProps.setIfBoardDataList) {
    //   this.setState({
    //     boardDataList: nextProps.setIfBoardDataList,
    //   });
    // }
    if (nextProps.catePageList.length > 0) {
      if (this.state.widgetId === nextProps.catePageList[0].widgetId) {
        if ((nextProps.setIfBoardDataList.length === nextProps.catePageList.length) && (nextProps.setIfBoardDataList.length === this.state.cateList.length)) {
          this.setState({
            boardDataList: nextProps.setIfBoardDataList,
            catePageList: nextProps.catePageList,
          });
        }
      }
    } else {
      // this.setState({
      //   boardDataList: [],
      //   catePageList: [],
      // });
    }
  }

  onClickOpen = (url) => {
    window.open(url);
  }

  HyperlinkFormatter = (val) => {
    const url = `${this.props.iflowUrl}/group/article/${val.dependentValues.arSeq}`;
    const replyIcon = (
      <span className="replyIcon" />
    );
    return (
      <div>
        <a
          href={url}
          title={val.dependentValues.arTitle}
          // onClick={() => this.onClickOpen(url)}
          target="_blank"
          className="titleText ellipsis"
        >
          {val.dependentValues.arTitle}
        </a>
        <div className="empInfo">
          <span className="subInfo">
            by {val.dependentValues.empName} <i className="div"> | </i> {val.dependentValues.regDt.split(' ')[0]}  {val.dependentValues.cntReply !== 0 ? replyIcon : ''}
          </span>
          {this.props.item.execMenu !== undefined ?
            <button className="more" onClick={() => { this.props.item.show(val.dependentValues, this.state.tabNum) }} id={val.dependentValues.arSeq}><span>+{intlObj.get(messages.moreView)}</span></button>
            :
            <div />
          }
        </div>
      </div>
    );
  };
  handleTabClicks = (num) => {
    this.setState({ tabNum: num });
  }
  render() {
    const {
      catePageList,
    } = this.state;
    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">{intlObj.get(messages.noPosts)}</p>
      </div>
    );

    const boardTab = () => {
      const wgWidth = Number(this.props.item.size.split('X')[0]);
      const wgHeight = Number(this.props.item.size.split('X')[1]);
      const wgTitleHeight = 35;
      const rowHeight = 44;

      const minWidth = this.props.view === 'Mobile' ? 630 : wgWidth * 320;

      // return this.props.setIfBoardDataList.map((item, i) => (
      return this.state.boardDataList.map((item, i) => (
        <TabPane tab={this.state.cateList[i].ctName} key={i + 1}>
          <ReactDataGrid
            columns={this.columns}
            rowGetter={(j) => {
              if (j === ((catePageList[i].page * pagepernum) - 1)) {
                  catePageList[i].page = catePageList[i].page + 1;
                this.props.boardListPageing(this.state.boardDataList, catePageList, i, pagepernum);
              }
              return item[j]
            }}
            rowsCount={item.length}
            rowHeight={rowHeight}
            scrollHeight={wgHeight * 270 - wgTitleHeight} // 슬림스크롤 높이
            minHeight={rowHeight * item.length} // 위젯 row 전체 높이
            minWidth={minWidth} // 위젯 최소 넓이
            headerRowHeight={-1}
            emptyRowsView={EmptyData}
          />
        </TabPane>
      ));
    };

    return (
      <BoardsStyle className="board" style={{ width: '100%', height: '100%' }}>
        {this.state.boardDataList.length > 0 ?
          <Tabs defaultActiveKey="1"
            activeKey={this.state.tabNum}
            onTabClick={this.handleTabClicks}
          >  
            {boardTab()}
          </Tabs>
          :          
          <ApplyPageStyle> 
            {/* <div className="applyPageWrapper">
              <div className="singleWidget"> */}
            <div className="widgetContent bgImgApplyPage">
              <p className="informTxt">
                <span>
                  {intlObj.get(messages.noSelectPosts)}
                  <br />
                  {intlObj.get(messages.goWidgetSet)}
                </span>
              </p>
            </div>
              {/* </div>
            </div> */}
          </ApplyPageStyle>}
      </BoardsStyle>
    );
  }
}

IfBoard.propTypes = {
  getIfBoardDataList: PropTypes.func, //eslint-disable-line
  setIfBoardDataList: PropTypes.array, //eslint-disable-line
  iflowUrl: PropTypes.string, //eslint-disable-line
  catePageList: PropTypes.array, //eslint-disable-line
  boardListPageing: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getIfBoardDataList: (cateList, page, pagepernum, widgetId) => dispatch(actions.getIfBoardDataList(cateList, page, pagepernum, widgetId)),
  boardListPageing: (boardDataList, catePageList, index, pagepernum) => dispatch(actions.boardListPageing(boardDataList, catePageList, index, pagepernum)),
});

const mapStateToProps = createStructuredSelector({
  setIfBoardDataList: selectors.makeIfBoardDataList(),
  iflowUrl: selectors.makeSelectIflowUrl(),
  catePageList: selectors.makeCatePageList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'IfBoard', saga });
const withReducer = injectReducer({ key: 'IfBoard', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IfBoard);
