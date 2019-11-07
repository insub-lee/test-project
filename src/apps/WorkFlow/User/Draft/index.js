import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Table } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import TitleRenderer from './TitleRenderer';
import DraftView from './DraftView';
import ApprovalView from '../../WorkFlowBase/ApprovalView';

const AntdTable = StyledAntdTable(Table);

const getColumns = (columns, CATE) => {
  if (CATE === 'draft') {
    columns.push(
      {
        title: '기안일',
        dataIndex: 'REG_DTTM',
        key: 'draftDttm',
        width: '15%',
      },
      {
        title: '상태',
        dataIndex: 'STATUS_NM',
        key: 'statusNm',
        width: '7%',
      },
    );
  } else if (CATE === 'unApproval') {
    // columns.push(
    //   {
    //     title: '결재단계',
    //     dataIndex: 'NODE_NAME_KOR',
    //     key: 'nodeNameKor',
    //     width: '10%',
    //   },
    //   {
    //     title: '결재자',
    //     dataIndex: 'APPV_NAME_KOR',
    //     key: 'appvNameKor',
    //     width: '10%',
    //   },
    // );
  } else {
    // columns.push(
    //   {
    //     title: '결재단계',
    //     dataIndex: 'NODE_NAME_KOR',
    //     key: 'nodeNameKor',
    //     width: '10%',
    //   },
    //   {
    //     title: '결재자',
    //     dataIndex: 'APPV_NAME_KOR',
    //     key: 'appvNameKor',
    //     width: '10%',
    //   },
    //   {
    //     title: '결재여부',
    //     dataIndex: 'APPV_STATUS_NM',
    //     key: 'appvStatsNm',
    //     width: '7%',
    //   },
    //   {
    //     title: '결재일시',
    //     dataIndex: 'APPV_DTTM',
    //     key: 'appvDttm',
    //     width: '10%',
    //   },
    // );
  }

  return columns;
};

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setSelectedDraft = this.setSelectedDraft.bind(this);
  }

  componentDidMount() {
    const { match, getDraftList, location } = this.props;
    const pathname = location && location.pathname ? location.pathname : 'draft/nodata';
    const payload = {
      searchType: match.params.CATE,
    };
    getDraftList(payload, pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.CATE !== prevProps.match.params.CATE) {
      const { location } = this.props;
      const pathname = location && location.pathname ? location.pathname : 'draft/nodata';
      const payload = {
        searchType: this.props.match.params.CATE,
      };
      this.props.getDraftList(payload, pathname);
    }
  }

  setSelectedDraft(draft, visible) {
    const { setSelectedDraft, location } = this.props;
    const pathname = location && location.pathname ? location.pathname : 'draft/nodata';
    setSelectedDraft(draft, visible, pathname);
  }

  render() {
    const { match, draftList, selectedDraft, visibleViewModal, location } = this.props;
    const pathname = location && location.pathname ? location.pathname : 'draft/nodata';
    let tableData = [];
    let selectedData = {};
    let visibleViewData = false;
    if (draftList) {
      tableData = draftList[pathname] || [];
    }
    if (selectedDraft) {
      selectedData = selectedDraft[pathname] || {};
    }
    if (visibleViewModal) {
      visibleViewData = visibleViewModal[pathname] || false;
    }
    const { CATE } = match.params;
    let columns = [
      {
        title: 'No',
        dataIndex: 'RNUM',
        key: 'rnum',
        width: '5%',
      },
      {
        title: 'Title',
        dataIndex: 'DRAFT_TITLE',
        key: 'title',
        render: (text, record) => (
          <TitleRenderer data={record} value={text} category={CATE} setSelectedDraft={this.props.setSelectedDraft} pathname={pathname} />
        ),
        ellipsis: true,
      },
      {
        title: '기안자',
        dataIndex: 'NAME_KOR',
        key: 'nameKor',
        width: '10%',
      },
    ];
    columns = getColumns(columns, CATE);

    return (
      <div style={{ width: '100%', height: '600px', padding: '48px' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <AntdTable
            key={`${pathname}_list_table`}
            columns={columns}
            dataSource={tableData.map((item, idx) => ({
              ...item,
              key: idx,
              DRAFT_DTTM: item.DRAFT_DTTM ? item.DRAFT_DTTM.substr(0, 10) : '',
              APPV_DTTM: item.APPV_DTTM ? item.APPV_DTTM.substr(0, 10) : '',
            }))}
            bordered
            pagination
          />
        </div>
        {Object.keys(selectedData).length !== 0 && (
          // <DraftView selectedDraft={selectedDraft} visible={visibleViewModal} CATE={CATE} setSelectedDraft={this.props.setSelectedDraft} />
          <ApprovalView selectedDraft={selectedDraft[pathname]} visible={visibleViewData} CATE={CATE} setSelectedDraft={this.setSelectedDraft} />
        )}
      </div>
    );
  }
}

Draft.propTypes = {
  match: PropTypes.object.isRequired,
  draftList: PropTypes.object.isRequired,
  selectedDraft: PropTypes.object.isRequired,
  visibleViewModal: PropTypes.object.isRequired,
  getDraftList: PropTypes.func.isRequired,
  setSelectedDraft: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  draftList: selectors.makeDraftList(),
  selectedDraft: selectors.makeSelectedDraft(),
  visibleViewModal: selectors.makeVisibleViewModal(),
});

const mapDispatchToProps = dispatch => ({
  getDraftList: (payload, pathname) => dispatch(actions.getDraftList(payload, pathname)),
  setSelectedDraft: (draft, visible, pathname) => dispatch(actions.setSelectedDraft(draft, visible, pathname)),
  initDraftData: () => dispatch(actions.initDraftData()),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.User.Draft', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.User.Draft', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(Draft);
