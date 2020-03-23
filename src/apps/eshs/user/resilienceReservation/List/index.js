import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colDefs: [],
      rowData: [],
    };
  }

  render() {
    const { colDefs, rowData } = this.state;
    return (
      <StyledViewDesigner>
        <Sketch>
          <AgGridReact colDefs={colDefs} rowData={rowData} />
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
