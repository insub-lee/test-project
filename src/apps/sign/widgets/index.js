import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ErrorBoundary from 'containers/common/ErrorBoundary';
// import ReactDataGrid from 'react-data-grid';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import SignWrapper from './signStyle';

class Sign extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'ApprDocTitle',
        // name: `${intlObj.get(messages.titleSiteName)}`,
        name: '제목',
        sortable: true,
        resizable: true,
        // width: 250,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
      // {
      //   key: 'DrafterName',
      //   name: '기안자',
      //   resizable: true,
      //   sortable: false,
      //   width: 60,
      // },
      // {
      //   key: 'DraftDateTime',
      //   name: '기안일',
      //   resizable: true,
      //   sortable: true,
      //   width: 72,
      // },
    ];

    this.state = {
    };

    this.props.getSignList(
      'aa', // 사번을 보내야 함.
    );

  }

  // componentDidMount() {
  //   this.props.getSignList(
  //     'aa', // 사번을 보내야 함.
  //   );
  // }

  rowList = (i) => {
    // if (i === pageNum - 1) {
    //   pageNum += pageIndex;
      // this.props.getSignList(
      //   'aa',
      // );
    // }
    const row = this.props.getRow[i];

    const today = this.toYearMonthDate(new Date());
    // alert(today);
    // alert(row.DraftDateTime.substring(0, 10));
    row.DraftDateTime = today === row.DraftDateTime.substring(0, 10) ? row.DraftDateTime.substring(11, 19) : row.DraftDateTime.substring(0, 10);
    return this.props.getRow[i];
  }

    // Date => String(yyyy-MM-dd)
    toYearMonthDate = (date) => {
      const TempDate = date;
      const timestamp = new Date(TempDate).getTime();
      const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
      const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
      const toyear = new Date(timestamp).getFullYear();
      const cDate = toyear + '-' + tomonth + '-' + todate
      return cDate;
    }
  
  openClick = (url) => {
    window.open(url);
  };

  HyperlinkFomatter = (val) => {
    // const hyperlinkName = 'http://cubesign.skhynix.com/';
    const detailKey = 'http://apv.skhynix.com/WebSite/Approval/Forms/Form.aspx?mode=APPROVAL&piid=' + val.dependentValues.ApprDocPID + '' + val.dependentValues.ApprDocWID;

    const hyperlinkName = val.dependentValues.ApprDocTitle;
    // const detailKey = val.dependentValues.SIGN_TITLE;

    return (
      <div>
        <ErrorBoundary>
          <a
            href={detailKey}
            title={hyperlinkName}
            // onClick={() => this.openClick(detailKey)}
            // onKeyPress={detailKey}
            // onKeyPress={() => this.openClick(detailKey)}
            // role="button"
            // tabIndex="0"
            target="_blank"
            className="titleText ellipsis"
          >
            {hyperlinkName}
          </a>
          <div className="empInfo">
            <span className="subInfo">
              by {val.dependentValues.DrafterName} <i className="div"> | </i> {val.dependentValues.DraftDateTime}
            </span>
          </div>
        </ErrorBoundary>
      </div>
    );
  };

  render() {
    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">결재할 내용이 없습니다.</p>
      </div>
    );

    // 위젯 제목 유무에 따른 높이 조절
    const wgHeight = Number(this.props.item.size.split('X')[1]);
    const wgTitleHeight = this.props.item.user.isTitle ? 35 : 0;
    const rowHeight = 44;

    return (
      <SignWrapper className="sign">
        <ErrorBoundary>
          <ReactDataGrid
            // rowKey="SITE_ID"
            columns={this.columns}
            rowGetter={this.rowList}
            rowsCount={this.props.getRow.length}
            // onRowClick={this.onRowClick}
            // getCellActions={this.getCellActions}
            // onGridSort={this.handleGridSort}
            // rowSelection={{
            //   showCheckbox: false,
            //   enableShiftSelect: true,
            //   onRowsSelected: this.onRowsSelected,
            //   onRowsDeselected: this.onRowsDeselected,
            //   selectBy: {
            //     indexes: this.state.selectedIndexes,
            //   },
            // }}
            rowHeight={rowHeight}
            scrollHeight={wgHeight * 270 - wgTitleHeight} // 슬림스크롤 높이
            minHeight={rowHeight * this.props.getRow.length} // 위젯 row 전체 높이
            emptyRowsView={EmptyData}
          />
          {/* <img
            alt="Board"
            src="/apps/sign.png"
            style={{ width: 320, height: 200 }}
          /> */}
        </ErrorBoundary>
      </SignWrapper>
    );
  }
}

Sign.propTypes = {
  getSignList: PropTypes.func, //eslint-disable-line
  getRow: PropTypes.array, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getSignList: (
      userId,
    ) => dispatch(actions.getSignList(
      userId,
    )),
    historyPush: url => dispatch(push(url)),
    // delRow: delData => dispatch(actions.delRow(delData)),
  }
);

const mapStateToProps = createStructuredSelector({
  getRow: selectors.makeGetSignList(),
  // delList: selectors.makeDelRow(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Sign', saga });
const withReducer = injectReducer({ key: 'Sign', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Sign);
