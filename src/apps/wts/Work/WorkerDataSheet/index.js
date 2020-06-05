import React from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid-addons';

import StyledWrapper from './StyledWrapper';

const { Selectors } = Data;

const defaultColumnProperties = {
  sortable: true,
  filterable: true,
  resizable: true,
};

const columns = [{ key: 'id', name: 'ID', sortDescendingFirst: true }, { key: 'title', name: 'Title' }, { key: 'complete', name: 'Complete' }].map(column => ({
  ...column,
  ...defaultColumnProperties,
}));

class WorkerDataSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.initialRows,
      filters: {},
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.getRows = this.getRows.bind(this);
  }

  handleFilterChange(filter) {
    this.setState(({ filters }) => {
      const newFilters = { ...filters };
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }
      return { filters: newFilters };
    });
  }

  clearFilters() {
    this.setState({ filters: {} });
  }

  getRows(rows, filters) {
    return Selectors.getRows({ rows, filters });
  }

  sortRows(initialRows, sortColumn, sortDirection) {
    this.setState(({ rows }) => {
      const comparer = (a, b) => {
        if (sortDirection === 'ASC') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        }
        if (sortDirection === 'DESC') {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
        return 0;
      };
      return sortDirection === 'NONE' ? { rows: initialRows } : { rows: [...rows].sort(comparer) };
    });
  }

  render() {
    const { rows, filters } = this.state;
    const { initialRows } = this.props;
    const filteredRows = this.getRows(rows, filters);
    return (
      <StyledWrapper>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => filteredRows[i]}
          rowsCount={filteredRows.length}
          toolbar={<Toolbar enableFilter />}
          onGridSort={(sortColumn, sortDirection) => this.sortRows(initialRows, sortColumn, sortDirection)}
          onAddFilter={filter => this.handleFilterChange(filter)}
          onClearFilters={this.clearFilters}
        />
      </StyledWrapper>
    );
  }
}

WorkerDataSheet.propTypes = {
  initialRows: PropTypes.arrayOf(PropTypes.object),
};

WorkerDataSheet.defaultProps = {
  initialRows: [],
};

export default WorkerDataSheet;
