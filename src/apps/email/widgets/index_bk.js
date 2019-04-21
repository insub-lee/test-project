import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import ReactDataGrid from 'react-data-grid';
// import reducer from './reducer';
// import saga from './saga';
// import * as selectors from './selectors';
// import * as actions from './actions';
// import Iframe from 'react-iframe'
// import { MailWrapper } from './mailStyle';

// class Email extends PureComponent {
//   render() {
//     return (
//       <MailWrapper>
//         <Iframe url="http://cubemail.skhynix.com/"
//           // width="450px"
//           height="230px"
//           id="myId"
//           className="myClassname"
//           display="initial"
//           position="relative"
//           allowFullScreen/>
//       </MailWrapper>
//     );
//   }
// }

class Email extends PureComponent {
  render() {
    return (
      <div>
        <img
          alt="Board"
          src="/apps/mail.png"
          style={{ width: 320, }}
        />
      </div>
    );
  }
}

export default Email;

// class Email extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.columns = [
//       {
//         key: 'FILE_YN',
//         name: '첨부',
//         resizable: false,
//         sortable: false,
//         width: 50,
//       },
//       {
//         key: 'MAIL_TITLE',
//         // name: `${intlObj.get(messages.titleSiteName)}`,
//         name: '제목',
//         sortable: true,
//         resizable: true,
//         width: 250,
//         formatter: this.HyperlinkFomatter,
//         getRowMetaData: data => data,
//       },
//       {
//         key: 'MAIL_DATE',
//         name: '받은날짜',
//         resizable: true,
//         sortable: true,
//       },
//     ];

//     this.state = {
//     };

//     this.props.getMailList(
//       'aa', // 사번을 보내야 함.
//     );

//   }

//   // componentDidMount() {
//   //   this.props.getMailList(
//   //     'aa', // 사번을 보내야 함.
//   //   );
//   // }

//   rowList = (i) => {
//     // if (i === pageNum - 1) {
//     //   pageNum += pageIndex;
//       // this.props.getMailList(
//       //   'aa',
//       // );
//     // }
//     return this.props.getRow[i];
//   }

//   openClick = (url) => {
//     window.open(url);
//   };

//   HyperlinkFomatter = (val) => {
//     // const hyperlinkName = 'http://cubemail.skhynix.com/';
//     const detailKey = 'http://cubemail.skhynix.com/';

//     const hyperlinkName = val.dependentValues.MAIL_TITLE;
//     // const detailKey = val.dependentValues.MAIL_TITLE;

//     return (
//       <span
//         onClick={() => this.openClick(detailKey)}
//         // onKeyPress={detailKey}
//         onKeyPress={() => this.openClick(detailKey)}
//         role="button"
//         tabIndex="0"
//       >
//         {hyperlinkName}
//       </span>
//     );
//   };

//   render() {
//     const EmptyData = () => (
//       <div>
//         <td colSpan="5"><font size="5">메일이 없습니다.</font></td>
//       </div>
//     );

//     return (
//       <div>
//         <ReactDataGrid
//           // rowKey="SITE_ID"
//           columns={this.columns}
//           rowGetter={this.rowList}
//           rowsCount={this.props.getRow.length}
//           // onRowClick={this.onRowClick}
//           // getCellActions={this.getCellActions}
//           // onGridSort={this.handleGridSort}
//           // rowSelection={{
//           //   showCheckbox: false,
//           //   enableShiftSelect: true,
//           //   onRowsSelected: this.onRowsSelected,
//           //   onRowsDeselected: this.onRowsDeselected,
//           //   selectBy: {
//           //     indexes: this.state.selectedIndexes,
//           //   },
//           // }}
//           emptyRowsView={EmptyData}
//         />
//         {/* <img
//           alt="Board"
//           src="/apps/mail.png"
//           style={{ width: 320, height: 200 }}
//         /> */}
//       </div>
//     );
//   }
// }

// Email.propTypes = {
//   siteId: PropTypes.string, //eslint-disable-line
//   getMailList: PropTypes.func, //eslint-disable-line
//   // delRow: PropTypes.func,  //eslint-disable-line
//   getRow: PropTypes.array, //eslint-disable-line
//   delList: PropTypes.array,  //eslint-disable-line
//   history: PropTypes.object,//eslint-disable-line
//   historyPush: PropTypes.func, //eslint-disable-line
// };

// const mapDispatchToProps = dispatch => (
//   {
//     getMailList: (
//       userId,
//     ) => dispatch(actions.getMailList(
//       userId,
//     )),
//     historyPush: url => dispatch(push(url)),
//     // delRow: delData => dispatch(actions.delRow(delData)),
//   }
// );

// const mapStateToProps = createStructuredSelector({
//   getRow: selectors.makeGetMailList(),
//   // delList: selectors.makeDelRow(),
// });

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withSaga = injectSaga({ key: 'Email', saga });
// const withReducer = injectReducer({ key: 'Email', reducer });

// export default compose(
//   withReducer,
//   withConnect,
//   withSaga,
// )(Email);
