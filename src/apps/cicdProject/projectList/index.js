import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import StyleProjecList from './StyleProjecList';
import { BtnWhiteWrite } from './buttons.style';
import QuestionMark from './QuestionMark';
import StateBar from './StateBar';

class ProjectList extends PureComponent {
  constructor(props) {
    super(props);

    this.columnDefs = [
      {
        headerName: '프로젝트명',
        field: 'PRJ_NM',
        width: 250,
        lockPosition: true,
        cellStyle: { fontSize: '13px' },
      },
      {
        headerName: '',
        field: '',
        width: 50,
        lockPosition: true,
        cellStyle: { fontSize: '13px' },
        cellRenderer: 'questionMark',
      },
      {
        headerName: 'STATUS',
        field: 'STATUS',
        width: 150,
        lockPosition: true,
        cellStyle: { fontSize: '13px' },
        cellRenderer: 'stateBar',
      },
      {
        headerName: 'CPU',
        field: 'CPUS',
        width: 150,
        lockPosition: true,
        cellStyle: { fontSize: '13px' },
      },
      {
        headerName: 'MEMORY',
        field: 'MEM',
        width: 150,
        lockPosition: true,
        cellStyle: { fontSize: '13px' },
      },
      {
        headerName: 'DISK',
        field: 'DISK',
        width: 150,
        lockPosition: true,
        cellStyle: { fontSize: '13px' },
      },
    ];

    this.state = {
      keyword: '',
      frameworkComponents: {
        questionMark: QuestionMark,
        stateBar: StateBar,
      },
    };

    this.defaultColDef = { resizable: true };
    this.domLayout = 'autoHeight';
    this.rowSelection = 'single';

    this.handleSearch = this.handleSearch.bind(this);

    const {
      handleProjectListSearch,
    } = this.props;

    handleProjectListSearch('');
  }

  handleOnCellClicked = (event) => {
    const rowData = event.api.getSelectedRows();
    // const param = rowData[0];
    const { colId } = event.column;

    if (colId === 'PRJ_NM') {
      this.props.history.push({
        pathname: '/apps/cicdProject/projectDtl',
        state: rowData[0],
      });
    } else if (colId === 'STATUS') {
      alert('STATUS');
    } else if (colId === '0') {
      this.props.history.push({
        pathname: '/apps/cicdService/serviceReg',
        state: rowData[0],
      });
    }
  }

  // Input 검색값 변경 시
  handleSearch(e) {
    // console.log(e.target.value);
    this.setState({ keyword: e.target.value });
  }

  handleClick = () => {
    this.props.handleProjectListSearch(this.state.keyword);
  }

  render() {
    return (
      <form name="frmPopup" onSubmit={event => event.preventDefault()}>
        <input type="hidden" name="arg1" />
        <input type="hidden" name="arg2" />
        <div> <h2> Projects </h2> </div>
        <div>
          <StyleProjecList>
            <h3 className="pageTitle list">
              <div className="searchBox">
                <ErrorBoundary>
                  <div className="searchWrapper">
                    <Input
                      placeholder="검색어를 입력해주세요."
                      value={this.state.keyword}
                      onChange={this.handleSearch}
                    />
                    <button
                      title="검색"
                      className="searchBtn"
                      onClick={this.handleClick}
                    />
                  </div>
                </ErrorBoundary>
              </div>
            </h3>
          </StyleProjecList>
        </div>
        <div style={{ padding: 20, textAlign: 'right' }}>
          <BtnWhiteWrite>
            <Link to="/apps/cicdProject/projectReg"> Create Project </Link>
          </BtnWhiteWrite>
        </div>
        <div style={{ padding: 20, textAlign: 'left' }}>
          <div>
            Total Project : {this.props.projectCountInfo}
          </div>
        </div>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100%',
            padding: '20px',
          }}
        >
          <AgGridReact
            columnDefs={this.columnDefs}
            rowData={this.props.projectListSearch}
            defaultColDef={this.defaultColDef}
            domLayout={this.domLayout}
            rowSelection={this.rowSelection}
            onCellClicked={this.handleOnCellClicked}
            frameworkComponents={this.state.frameworkComponents}
          />
        </div>
      </form>
    );
  }
}

ProjectList.propTypes = {
  handleProjectListSearch: PropTypes.func.isRequired,
  projectListSearch: PropTypes.array,
  projectCountInfo: PropTypes.number, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  cellClickedReturn: PropTypes.func, //eslint-disable-line
};

ProjectList.defaultProps = {
  projectListSearch: [],
};

const mapStateToProps = createStructuredSelector({
  projectListSearch: selectors.makeProjectListSearch(),
  projectCountInfo: selectors.makeProjectCountInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleProjectListSearch: value => dispatch(actions.projectListSearch(value)),
  };
}

const withReducer = injectReducer({ key: 'ProjectList', reducer });
const withSaga = injectSaga({ key: 'ProjectList', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectList);
