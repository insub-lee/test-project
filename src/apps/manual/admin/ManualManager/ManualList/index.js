import React, { Component } from 'react';
import { Table, Button, Spin, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import * as manageActions from '../actions';

import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import selectors from './selectors';
import StyleManualList from './StyleManualList';

const AntdTable = StyledAntdTable(Table);

class ManualList extends Component {
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder="Search "
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  columns = setManualManage => [
    {
      title: '매뉴얼명',
      dataIndex: 'MUAL_NAME',
      key: 'MUAL_IDX',
      ...this.getColumnSearchProps('MUAL_NAME'),
      render: (text, record) => (
        <Button className="manualListTitle" type="link" onClick={() => setManualManage('view', record.CATEGORY_IDX, record.MUAL_IDX)}>
          {<span dangerouslySetInnerHTML={{ __html: record.MUAL_NAME }} />}
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
      ...this.getColumnSearchProps('MANAGERNAME'),
      // width: '10%',
    },
    {
      title: '배포일',
      dataIndex: 'PUBDATE',
      key: 'PUBDATE',
      // width: '10%',
    },
  ];

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
          <AntdTable
            dataSource={dataSource}
            columns={this.columns(setManualManage)}
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
