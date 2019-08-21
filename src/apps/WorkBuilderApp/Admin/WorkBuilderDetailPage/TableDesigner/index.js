import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import TableBuilder from 'components/TableBuilder';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

class TableDesigner extends Component {
  componentDidMount() {
    // Todo - Read Meta Data
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  render() {
    const { headers, column, usableItems, addHeader, removeItem, onDragEnd } = this.props;
    return <TableBuilder headers={headers} column={column} onDragEnd={onDragEnd} items={usableItems} action={{ addHeader, removeItem }} />;
  }
}

TableDesigner.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  usableItems: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.object,
  addHeader: PropTypes.func,
  removeItem: PropTypes.func,
  onDragEnd: PropTypes.func,
  id: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
};

TableDesigner.defaultProps = {
  headers: [],
  usableItems: [],
  column: {},
  addHeader: () => console.debug('no bind events'),
  removeItem: () => console.debug('no bind events'),
  onDragEnd: () => console.debug('no bind events'),
  fetchData: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  headers: selectors.makeSelectHeaders(),
  usableItems: selectors.makeSelectUsableItems(),
  column: selectors.makeSelectColumn(),
});

const mapDispatchToProps = dispatch => ({
  onDragEnd: dropResult => dispatch(actions.onDragEnd(dropResult)),
  addHeader: label => dispatch(actions.addHeader(label)),
  removeItem: () => dispatch(actions.removeItem()),
  fetchData: id => dispatch(actions.fetchData(id)),
});

const withReducer = injectReducer({ key: 'work-builder-detail-table-designer', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-table-designer', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TableDesigner);
