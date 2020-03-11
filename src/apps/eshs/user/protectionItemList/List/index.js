import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';
import { Select, Input } from 'antd';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import request from 'utils/request';
import { debounce } from 'lodash';

const { Option } = Select;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSite: '',
      input: '',
      columnDefs: [
        {
          headerName: '품목',
          field: 'kind',
          width: 170,
        },
        {
          headerName: '모델',
          field: 'model',
          width: 200,
        },
        {
          headerName: 'Size',
          field: 'size1',
          width: 130,
        },
        {
          headerName: '검정#',
          field: 'app_no',
        },
        {
          headerName: 'Vendor',
          field: 'vendor_nm',
          width: 130,
        },
        {
          headerName: 'Maker',
          field: 'maker_nm',
        },
        {
          headerName: '단가',
          field: 'unitprice',
          valueFormatter: this.numberFormatter,
        },
        {
          headerName: '유효기간',
          field: 'validity_term',
        },
        {
          headerName: '적정재고',
          field: 'properstock',
        },
        {
          headerName: '비고',
          field: 'comments',
          width: 300,
        },
      ],
      rowData: [],
    };
    this.getNewRowData = debounce(this.getNewRowData, 300);
  }

  gridOptions = {
    defaultColDef: {
      width: 100,
      resizable: true,
    },
  };

  initGridData = () => {
    this.getProtectionItemList().then(res => this.setState({ rowData: res.response.list }));
  };

  changeGridData = func => {
    this.setState({
      rowData: func.response.list,
    });
  };

  getProtectionItemList = async () => {
    const result = await request({
      url: '/api/eshs/v1/common/geteshsprotectionitems',
      method: 'GET',
    });
    return result;
  };

  handleSelectChange = async value => {
    const { input } = this.state;
    this.setState({
      selectedSite: value,
    });
    this.getNewRowData(value, input);
  };

  handleInputChange = e => {
    const { selectedSite } = this.state;
    this.setState({
      input: e.target.value,
    });
    this.getNewRowData(selectedSite, e.target.value);
  };

  getNewRowData = async (site, keyword) => {
    const result = await request({
      url: `/api/eshs/v1/common/geteshsprotectionitems?site=${site}&keyword=${keyword}`,
      method: 'GET',
    });
    this.changeGridData(result);
  };

  numberFormatter = params => params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  render() {
    const { columnDefs, rowData } = this.state;
    const { changeBuilderModalState, viewPageData } = this.props;
    const { initGridData, gridOptions, handleSelectChange, handleInputChange } = this;
    return (
      <StyledViewDesigner>
        <Sketch>
          <div>
            <Select defaultValue="청주" onChange={handleSelectChange}>
              <Option value="청주">청주</Option>
              <Option value="구미">구미</Option>
            </Select>
            <Input
              onChange={handleInputChange}
              style={{ width: '300px', marginRight: '10px', marginLeft: '10px', marginBottom: '10px' }}
              placeholder="품목을 입력하세요."
            />
            <StyledButton className="btn-primary" onClick={() => changeBuilderModalState(true, 'INPUT', viewPageData.workSeq, -1)}>
              등록
            </StyledButton>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '560px' }}>
              <AgGridReact
                // defaultColDef={columnDefs}
                columnDefs={columnDefs}
                rowData={rowData}
                onGridReady={initGridData}
                gridOptions={gridOptions}
                suppressRowTransform
              />
            </div>
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  changeBuilderModalState: PropTypes.func,
  viewPageData: PropTypes.object,
};

export default List;
