import React, { Component } from 'react';
import { Table, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';

import * as manageActions from '../../ManualManager/actions';

import reducer from '../reducer';
import saga from '../saga';
import * as actions from '../actions';
import selectors from '../selectors';
import StyleManualList from './StyleManualList';

const columns = (setManualManage, setIsWaitModal) => [
  {
    title: '매뉴얼명',
    dataIndex: 'MUAL_NAME',
    key: 'MUAL_IDX',
    render: (text, record) => (
      <Button
        className="manualListTitle"
        type="link"
        onClick={() => {
          setManualManage('view', record.CATEGORY_IDX, record.MUAL_IDX);
          setIsWaitModal(false);
        }}
      >
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
    const { getManualList } = this.props;
    getManualList();
  }

  render() {
    const { manualList, setManualManage, isLoading, paginationIdx, setPaginationIdx, setIsWaitModal } = this.props;
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
            columns={columns(setManualManage, setIsWaitModal)}
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
  setPaginationIdx: PropTypes.func,
  getManualList: PropTypes.func,
  setIsWaitModal: PropTypes.func,
};

ManualList.defaultProps = {
  setManualManage: () => false,
  manualList: fromJS([]),
  categoryIndex: 0,
  isLoading: false,
  paginationIdx: 1,
  setPaginationIdx: () => false,
  getManualList: () => false,
  setIsWaitModal: () => false,
};

const mapStateToProps = createStructuredSelector({
  manualList: selectors.makeSelectManualist(),
  isLoading: selectors.makeSelectIsLoading(),
  paginationIdx: selectors.makeSelectPaginationIdx(),
});

const mapDispatchToProps = dispatch => ({
  getManualList: () => dispatch(actions.getManualList()),
  setManualManage: (pageType, categoryIdx, manualIdx) => dispatch(manageActions.setPageModeByReducr(pageType, categoryIdx, manualIdx)),
  setPaginationIdx: idx => dispatch(actions.setPaginationIdxByReducr(idx)),
  setIsWaitModal: flag => dispatch(actions.setIsWaitModalByReducr(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualList);
