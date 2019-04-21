import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

class ReactDataGridCustom extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      test: 'test',
    };
  }

  render() {
    const {
      test,
    } = this.state;
    console.log(test);
    return (
      <ReactDataGrid
        {...this.props}
      />
    );
  }
}

export default ReactDataGridCustom;
