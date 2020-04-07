import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

import EquipInputPage from '../sqtbEquipMgt';
import CustomInput from './pages/CustomInput';
import CustomModify from './pages/CustomModify';

class sqConfirmRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {}

  customOnRowClick = selectedRowData => {
    // console.debug('...............', selectedRowData);
  };

  render() {
    const { sagaKey } = this.props;
    return (
      <>
        <BizBuilderBase
          sagaKey={sagaKey}
          FieldCustomInputPage={EquipInputPage}
          CustomInputPage={CustomInput}
          CustomModifyPage={CustomModify}
          workSeq={5561}
          viewType="INPUT"
          loadingComplete={this.loadingComplete}
          customOnRowClick={record => this.customOnRowClick(record)}
        />
      </>
    );
  }
}

sqConfirmRequest.defaultProps = {
  sagaKey: 'sqConfirmRequest',
};

export default sqConfirmRequest;
