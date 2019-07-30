import React, { Component } from 'react';
import { Table, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as manageActions from '../actions';

import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import selectors from './selectors';
import StyleManualList from './StyleManualList';

const columns = setManualManage => [
  {
    title: '매뉴얼명',
    dataIndex: 'MUAL_NAME',
    key: 'MUAL_IDX',
    render: (text, record) => (
      <Button className="manualListTitle" type="link" onClick={() => setManualManage('view', record.CATEGORY_IDX, record.MUAL_IDX)}>
        {record.MUAL_NAME}
      </Button>
    ),
    width: '60%',
  },
  {
    title: 'Version',
    dataIndex: 'VERSION',
    key: 'VERSION',
    // width: '10%',
  },
  {
    title: '담당자',
    dataIndex: 'MANAGERNAME',
    key: 'MANAGERNAME',
    // width: '10%',
  },
  {
    title: '배포일',
    dataIndex: 'PUBDATE',
    key: 'PUBDATE',
    // width: '10%',
  },
];

class ManualList extends Component {
  componentDidMount() {
    const { GetManualList, match, categoryIndex } = this.props;
    if (match && match.params) {
      const { categoryIdx } = match.params;
      GetManualList(categoryIdx);
    } else if (categoryIndex > 0) {
      GetManualList(categoryIndex);
    }
  }

  componentDidUpdate(prevProps) {
    const { GetManualList, match, categoryIndex, setPaginationIdx } = this.props;
    if (match && match.params) {
      const { categoryIdx } = match.params;
      GetManualList(categoryIdx);
    } else if (prevProps.categoryIndex !== categoryIndex && categoryIndex > 0) {
      GetManualList(categoryIndex);
      setPaginationIdx(1);
    }
  }

  render() {
    const { manualList, setManualManage, isLoading, paginationIdx, setPaginationIdx } = this.props;
    const dataSource = [];
    manualList.map(item =>
      dataSource.push({
        key: `${item.get('MUAL_IDX')}_${item.get('CATEGORY_IDX')}`,
        MUAL_NAME: item.get('MUAL_NAME'),
        VERSION: item.get('VERSION'),
        PUBDATE: item.get('PUBDATE'),
        MANAGERNAME: item.get('MANAGERNAME'),
        MUAL_IDX: item.get('MUAL_IDX'),
        CATEGORY_IDX: item.get('CATEGORY_IDX'),
      }),
    );
    return (
      <StyleManualList>
        <Spin tip="Loading..." spinning={isLoading}>
          <Table
            dataSource={dataSource}
            columns={columns(setManualManage)}
            pagination={{ current: paginationIdx }}
            onChange={pagination => setPaginationIdx(pagination.current)}
          />
        </Spin>
      </StyleManualList>
    );
  }
}

ManualList.propTypes = {
  setManualManage: PropTypes.func,
  manualList: PropTypes.object,
  categoryIndex: PropTypes.number,
  isLoading: PropTypes.bool,
  paginationIdx: PropTypes.number,
};

ManualList.defaultProps = {
  setManualManage: () => false,
  manualList: fromJS([]),
  categoryIndex: 0,
  isLoading: false,
  paginationIdx: 1,
};

const mapStateToProps = createStructuredSelector({
  manualList: selectors.makeSelectManualist(),
  isLoading: selectors.makeSelectIsLoading(),
  paginationIdx: selectors.makeSelectPaginationIdx(),
});

const mapDispatchToProps = dispatch => ({
  GetManualList: categoryIdx => dispatch(actions.getManualList(categoryIdx)),
  setManualManage: (pageType, categoryIdx, manualIdx) => dispatch(manageActions.setPageModeByReducr(pageType, categoryIdx, manualIdx)),
  setPaginationIdx: idx => dispatch(actions.setPaginationIdxByReducr(idx)),
});

const withReducer = injectReducer({ key: 'apps-ManualList-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-ManualList-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManualList);
