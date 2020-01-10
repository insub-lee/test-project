import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import TitleRenderer from './TitleRenderer';

class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: 'No',
          field: 'RNUM',
          sortable: true,
        },
        {
          headerName: 'Title',
          field: 'TITLE',
          sortable: true,
          cellRenderer: 'titleRenderer',
        },
        {
          headerName: '기안자',
          field: 'NAME_KOR',
          sortable: true,
        },
        {
          headerName: '결재자',
          field: 'APPV_NAME_KOR',
          sortable: true,
        },
        {
          headerName: '기안일',
          field: 'DRAFT_DTTM',
          sortable: true,
        },
      ],
      defaultColDef: { resizable: true },
    };
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

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    const { columnDefs, defaultColDef } = this.state;
    const { match, history, draftList } = this.props;
    const { CATE } = match.params;
    const frameworkComponents = {
      titleRenderer: ({ data, value }) => <TitleRenderer data={data} value={value} category={CATE} history={history} />,
    };

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="ag-theme-balham" style={{ width: '100%', height: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={draftList}
            frameworkComponents={frameworkComponents}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

DraftList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object,
  draftList: PropTypes.array,
  getDraftList: PropTypes.func.isRequired,
  initDraftData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  draftList: selectors.makeDraftList(),
});

const mapDispatchToProps = dispatch => ({
  getDraftList: payload => dispatch(actions.getDraftList(payload)),
  initDraftData: () => dispatch(actions.initDraftData()),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.User.Draft.DraftList', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.User.Draft.DraftList', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(DraftList);
