import React, { Component } from 'react';

class HoldRelease extends Component {
  componentDidMount() {
    const { selectedRow, setSelectedRow } = this.props;
    const nSelectRow = { ...selectedRow, APPV_STATUS: 4 };
    setSelectedRow(nSelectRow);
  }

  render() {
    return '';
  }
}

export default HoldRelease;
