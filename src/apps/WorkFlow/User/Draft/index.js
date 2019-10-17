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
    columns.push({
      title: '기안일',
      dataIndex: 'DRAFT_DTTM',
      key: 'draftDttm',
      width: '15%',
    });
  } else {
    columns.push(
      {
        title: '결재자',
        dataIndex: 'APPV_NAME_KOR',
        key: 'appvNameKor',
        width: '10%',
      },
      {
        title: '결재여부',
        dataIndex: 'APPV_STATUS_NM',
        key: 'appvStatsNm',
        width: '5%',
      },
      {
        title: '결재일시',
        dataIndex: 'APPV_DTTM',
        key: 'appvDttm',
        width: '10%',
      },
    );
  }

  return columns;
};

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, getDraftList } = this.props;
    const payload = {
      searchType: match.params.CATE,
    };
    getDraftList(payload);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.CATE !== prevProps.match.params.CATE) {
      const payload = {
        searchType: this.props.match.params.CATE,
      };
      this.props.getDraftList(payload);
    }
  }

  render() {
    const { match, draftList, selectedDraft, visibleViewModal } = this.props;
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
        dataIndex: 'TITLE',
        key: 'title',
        render: (text, record) => <TitleRenderer data={record} value={text} category={CATE} setSelectedDraft={this.props.setSelectedDraft} />,
      },
      {
        title: '상태',
        dataIndex: 'STATUS_NM',
        key: 'statusNm',
        width: '10%',
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
          <AntdTable columns={columns} dataSource={draftList.map((item, idx) => ({ ...item, key: idx }))} bordered pagination />
        </div>
        {Object.keys(selectedDraft).length !== 0 && (
          // <DraftView selectedDraft={selectedDraft} visible={visibleViewModal} CATE={CATE} setSelectedDraft={this.props.setSelectedDraft} />
          <ApprovalView selectedDraft={selectedDraft} visible={visibleViewModal} CATE={CATE} setSelectedDraft={this.props.setSelectedDraft} />
        )}
      </div>
    );
  }
}

Draft.propTypes = {
  match: PropTypes.object.isRequired,
  draftList: PropTypes.array.isRequired,
  selectedDraft: PropTypes.object.isRequired,
  visibleViewModal: PropTypes.bool.isRequired,
  getDraftList: PropTypes.func.isRequired,
  setSelectedDraft: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  draftList: selectors.makeDraftList(),
  selectedDraft: selectors.makeSelectedDraft(),
  visibleViewModal: selectors.makeVisibleViewModal(),
});

const mapDispatchToProps = dispatch => ({
  getDraftList: payload => dispatch(actions.getDraftList(payload)),
  setSelectedDraft: (draft, visible) => dispatch(actions.setSelectedDraft(draft, visible)),
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
