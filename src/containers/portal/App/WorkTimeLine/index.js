import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ReactDataGrid from 'components/ReactDataGrid/WithAutoSizer';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import Wrapper from './Wrapper';
import HyperLink from './HyperLink';
import EmptyData from './EmptyData';

// const curDate = new Date();
const pageIndex = 10;
let pageSnum = 1;
let pageEnum = 10;

class WorkTimeLine extends PureComponent {
  componentDidMount() {
    const { getList } = this.props;
    getList(pageSnum, pageIndex);
  }

  rowGetter = i => this.props.list[i];

  readMore = () => {
    const { getList, list } = this.props;
    if (pageEnum - list.length < pageIndex) {
      pageSnum += 1;
      pageEnum += pageIndex;
      getList(pageSnum, pageIndex);
    }
  };

  render() {
    const { list, iflowUrl, height } = this.props;
    const columns = [
      {
        key: 'arTitle',
        name: 'TITLE',
        formatter: val => <HyperLink data={val} url={iflowUrl} />,
        getRowMetaData: data => data,
      },
    ];
    const rowHeight = 90;
    return (
      <Wrapper height={height}>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => list[i]}
          rowsCount={list.length}
          rowHeight={rowHeight}
          scrollHeight={300} // 슬림스크롤 높이
          minHeight={rowHeight * list.length} // 위젯 row 전체 높이
          emptyRowsView={EmptyData}
          readMore={this.readMore}
        />
      </Wrapper>
    );
  }
}

WorkTimeLine.propTypes = {
  getList: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  iflowUrl: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

WorkTimeLine.defaultProps = {
  getList: () => false,
  list: [],
  height: 0,
};

const mapDispatchToProps = dispatch => ({
  getList: (page, pagepernum) => dispatch(actions.getList(page, pagepernum)),
});

const mapStateToProps = createStructuredSelector({
  list: selectors.makeSelectList(),
  iflowUrl: selectors.makeSelectIflowUrl(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'work-time-line', saga });
const withReducer = injectReducer({ key: 'work-time-line', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkTimeLine);
