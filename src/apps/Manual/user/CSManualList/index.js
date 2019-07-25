import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';
import ListItem from './ListItem';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';

import Topbar from './Topbar';
import TitleBar from './TitleBar';

class CSManualList extends Component {
  componentDidMount() {
    const { GetTotalManualList } = this.props;
    GetTotalManualList(24240);
  }

  render() {
    const { totalManualList } = this.props;
    let ListItemData = fromJS({});
    if (totalManualList.size > 0) {
      const flatData = totalManualList.toJS();
      ListItemData = fromJS(
        getTreeFromFlatData({ flatData, getKey: node => node.CATEGORY_IDX, getParentKey: node => node.CATEGORY_PARENT_IDX, rootKey: 24240 }),
      );
    }
    return (
      <div style={{ padding: 40, border: '1px solid #eaeaea', borderRadius: 3 }}>
        <Topbar />
        {ListItemData.map(category => [
          <TitleBar categoryName={category.get('CATEGORY_NAME')} />,
          <Row gutter={12}>
            {category.get('children').map(manualitem => (
              <Col xxl={6} xl={8} md={12} sm={24} key={manualitem.get('CATEGORY_IDX')}>
                <ListItem data={manualitem.toJS()} />
              </Col>
            ))}
          </Row>,
        ])}
      </div>
    );
  }
}

// saga

CSManualList.propTypes = {
  GetTotalManualList: PropTypes.func,
  totalManualList: PropTypes.object,
};

CSManualList.defaultProps = {
  GetTotalManualList: false,
  totalManualList: [],
};

const mapStateToProps = createStructuredSelector({
  totalManualList: selectors.makeSelectCSManualList(),
});

const mapDispatchToProps = dispatch => ({
  GetTotalManualList: categoryIdx => dispatch(actions.getTotalManualList(categoryIdx)),
});

const withReducer = injectReducer({ key: 'apps-manual-user-CSManualList-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-CSManualList-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CSManualList);
