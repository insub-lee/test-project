import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import ReactDataGrid from 'react-data-grid';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import MailWrapper from './mailStyle';

class Email extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      // {
      //   key: 'attachments',
      //   name: '첨부',
      //   resizable: false,
      //   sortable: false,
      //   width: 20,
      // },
      {
        key: 'subject',
        // name: `${intlObj.get(messages.titleSiteName)}`,
        name: '제목',
        sortable: true,
        resizable: true,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
      // {
      //   key: 'fromName',
      //   name: '보낸사람',
      //   resizable: false,
      //   sortable: true,
      //   // width: 70,
      // },
      // {
      //   key: 'receiveDate',
      //   name: '받은날짜',
      //   resizable: false,
      //   sortable: true,
      //   width: 70,
      // },
    ];

    this.state = {
    };

    this.props.getMailList(
      'aa', // 사번을 보내야 함.
    );

  }

  componentDidMount() {
  //   this.props.getMailList(
  //     'aa', // 사번을 보내야 함.
  //   );
  }

  rowList = (i) => {
    // if (i === pageNum - 1) {
    //   pageNum += pageIndex;
      // this.props.getMailList(
      //   'aa',
      // );
    // }
    const row = this.props.getRow[i];
    // row.attachments = row.attachments === 'True' ? (<div className='active'>true</div>) : '';

    const today = this.toYearMonthDate(new Date());
    // alert(today);
    // alert(row.receiveDate.substring(0, 10));
    // alert(`row.fromName >>> ${row.fromName}`);
    // alert(`row.fromValue >>> ${row.fromValue}`);
    // alert(`row.fromName !== null >>> ${row.fromName !== null}`);
    row.fromName = row.fromName !== null ? row.fromName : row.fromValue;
    row.receiveDate = today === row.receiveDate.substring(0, 10) ? row.receiveDate.substring(11, 19) : row.receiveDate.substring(0, 10);
    // alert(`row.fromName2 >>> ${row.fromName}`);
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
    // const hyperlinkName = 'http://cubemail.skhynix.com/';
    const detailKey = 'https://email.skhynix.com/WOW/Mail/Login/Redirect.aspx?' + encodeURI(`target=/WOW/Mail/Message/ReadMessage.aspx?prebtn=0&viewSel=Read&messageId=${val.dependentValues.uid}`);

    const hyperlinkName = val.dependentValues.subject;
    // const detailKey = val.dependentValues.subject;

    return (
      <div>
        <a
          href={detailKey}
          title={hyperlinkName}
          // onClick={() => this.openClick(detailKey)}
          // onKeyPress={detailKey}
          // onKeyPress={() => this.openClick(detailKey)}
          // role="button"
          // tabIndex="0"
          className="titleText ellipsis"
          target="_blank"
        >
          {/* {hyperlinkName} */}
          {hyperlinkName}
        </a>
        <div className="empInfo">
          <span className="subInfo">
            by {val.dependentValues.fromName} <i className="div"> | </i> {val.dependentValues.receiveDate}
          </span>
        </div>
      </div>
    );
  };

  render() {
    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">메일이 없습니다.</p>
      </div>      
    );

    // 위젯 제목 유무에 따른 높이 조절
    const wgHeight = Number(this.props.item.size.split('X')[1]);
    const wgTitleHeight = this.props.item.user.isTitle ? 35 : 0;
    const rowHeight = 44;

    return (
      <MailWrapper className="email">
        <ErrorBoundary>
          <ReactDataGrid
            // rowKey="SITE_ID"
            columns={this.columns}
            rowGetter={this.rowList}
            rowsCount={this.props.getRow.length}
            emptyRowsView={EmptyData}
            rowHeight={rowHeight}
            scrollHeight={wgHeight * 270 - wgTitleHeight} // 슬림스크롤 높이
            minHeight={rowHeight * this.props.getRow.length} // 위젯 row 전체 높이
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
          />
          {/* <img
            alt="Board"
            src="/apps/mail.png"
            style={{ width: 320, height: 200 }}
          /> */}
        </ErrorBoundary>
      </MailWrapper>
    );
  }
}

Email.propTypes = {
  getMailList: PropTypes.func, //eslint-disable-line
  getRow: PropTypes.array, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getMailList: (
      userId,
    ) => dispatch(actions.getMailList(
      userId,
    )),
    historyPush: url => dispatch(push(url)),
    // delRow: delData => dispatch(actions.delRow(delData)),
  }
);

const mapStateToProps = createStructuredSelector({
  getRow: selectors.makeGetMailList(),
  // delList: selectors.makeDelRow(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Email', saga });
const withReducer = injectReducer({ key: 'Email', reducer });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Email);
