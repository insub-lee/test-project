import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import { Modal } from 'antd';
import EquipInputPage from '../sqtbEquipMgt';

class sqConfirmRequest extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  customOnRowClick = selectedRowData => {
    console.debug('...............', selectedRowData);
  };

  render() {
    return (
      <>
        <BizBuilderBase
          sagaKey="sqConfirmRequest"
          FieldCustomInputPage={EquipInputPage}
          workSeq={5561}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          customOnRowClick={record => this.customOnRowClick(record)}
        />
      </>
    );
  }
}

sqConfirmRequest.propTypes = {};

sqConfirmRequest.defaultProps = {};

export default sqConfirmRequest;
