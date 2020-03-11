import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '품목',
          field: '',
        },
        {
          headerName: '모델',
          field: '',
        },
        {
          headerName: 'Size',
          field: '',
        },
        {
          headerName: '검정#',
          field: '',
        },
        {
          headerName: 'Vendor',
          field: '',
        },
        {
          headerName: 'Maker',
          field: '',
        },
        {
          headerName: '단가',
          field: '',
        },
        {
          headerName: '유효기간',
          field: '',
        },
        {
          headerName: '적정재고',
          field: '',
        },
        {
          headerName: '비고',
          field: '',
        },
      ],
    };
  }

  render() {
    const { columnDefs } = this.state;
    return (
      <StyledViewDesigner>
        <Sketch>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham">
              <AgGridReact defaultColDef={columnDefs} columnDefs={columnDefs} />
            </div>
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

export default List;
