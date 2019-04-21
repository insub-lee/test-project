import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as actions from './actions';
import selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray, BtnWhiteWrite } from './buttons.style';

class Service extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      serviceName: '',
    };

    this.columnDefs = [
      {
        headerName: '서비스명',
        field: 'SRV_NM',
        width: 250,
        lockPosition: true,
        cellStyle: { fontWeight: 'bold', fontSize: '13px' },
      },
      {
        headerName: 'STATUS',
        field: 'STATUS',
        width: 150,
        lockPosition: true,
        cellStyle: { fontWeight: 'bold', fontSize: '13px' },
      },
      {
        headerName: 'CPU',
        field: 'CPUS',
        width: 150,
        lockPosition: true,
        cellStyle: { fontWeight: 'bold', fontSize: '13px' },
      },
      {
        headerName: 'MEMORY',
        field: 'MEM',
        width: 150,
        lockPosition: true,
        cellStyle: { fontWeight: 'bold', fontSize: '13px' },
      },
      {
        headerName: 'DISK',
        field: 'DISK',
        width: 150,
        lockPosition: true,
        cellStyle: { fontWeight: 'bold', fontSize: '13px' },
      },
    ];

    this.defaultColDef = { resizable: true };
    this.domLayout = 'autoHeight';
    this.rowSelection = 'single';

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  onSelectionChanged = (params) => {
    // const selectedRows = this.gridApi.getSelectedRows();
    // console.log('$$$ row selection', selectedRows);
    // if (selectedRows.length !== 0) {
    //   // this.props.getAttendMemberList(selectedRows[0].GRP_ID);
    //   console.log('##########################');
    // }
    const selectedRows = params.api.getSelectedRows();
    if (selectedRows.length !== 0) {
      this.props.history.push({
        pathname: '/apps/cicdService/serviceDetail',
        state: selectedRows[0],
      });
    }
  }

  handleSearch = () => {
    const { handleServiceSearch } = this.props;

    const param = {};
    param.PRJ_NM = 'project1';

    handleServiceSearch(param);
  }

  handleServiceNameChange = (e) => {
    this.setState({
      serviceName: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="PMSheetTitle">
          <h2>Service</h2><br />
        </div>
        <div>
          <div className="SearchBox">
            <table>
              <tbody>
                <tr>
                  <th style={{ width: 80 }} > 서비스명 </th>
                  <td style={{ width: 247 }}>
                    <Input id="serviceName" name="TITLE" type="text" value={this.state.serviceName} />
                  </td>
                  <td>
                    <BtnSearchDkGray
                      title="조회"
                      className="searchBtn"
                      onClick={this.handleSearch}
                    >
                    조회
                    </BtnSearchDkGray>
                  </td>
                  <td>
                    <BtnWhiteWrite>
                      <Link to="/apps/cicdService/serviceReg"> Create Service </Link>
                    </BtnWhiteWrite>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100%',
            padding: '20px',
          }}
        >
          <AgGridReact
            // enableSorting={true}
            // enableFilter={true}
            columnDefs={this.columnDefs}
            rowData={this.props.dataList}
            defaultColDef={this.defaultColDef}
            // suppressRowClickSelection={true}
            // editType={this.state.editType}
            domLayout={this.domLayout}
            rowSelection={this.rowSelection}
            onSelectionChanged={this.onSelectionChanged}
          />
        </div>
      </div>
    );
  }
}

Service.propTypes = {
  handleServiceSearch: PropTypes.func.isRequired,
  // handleServiceSave: PropTypes.func.isRequired,
  dataList: PropTypes.array,
  history: PropTypes.object,//eslint-disable-line
};

Service.defaultProps = {
  dataList: [],
};

const mapStateToProps = createStructuredSelector({
  dataList: selectors.makeDataList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleServiceSearch: param => dispatch(actions.serviceSearch(param)),
  };
}

const withReducer = injectReducer({ key: 'serviceList', reducer });
const withSaga = injectSaga({ key: 'serviceList', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Service);
