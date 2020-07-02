import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import CustomInput from './pages/CustomInput';
import CustomModify from './pages/CustomModify';

class AccountMgt extends Component {
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

  render() {
    const { sagaKey, inputMetaSeq, modifyMetaSeq, listMetaSeq, gubun } = this.props;
    return (
      <BizBuilderBase
        sagaKey={sagaKey}
        workSeq={401}
        viewType="INPUT"
        CustomInputPage={CustomInput}
        CustomModifyPage={CustomModify}
        modifyMetaSeq={modifyMetaSeq}
        inputMetaSeq={inputMetaSeq}
        listMetaSeq={listMetaSeq}
        loadingComplete={this.loadingComplete}
        gubun={gubun}
      />
    );
  }
}

AccountMgt.propTypes = {
  inputMetaSeq: PropTypes.number,
  modifyMetaSeq: PropTypes.number,
  listMetaSeq: PropTypes.number,
  sagaKey: PropTypes.string,
  gubun: PropTypes.string,
};

AccountMgt.defaultProps = {
  inputMetaSeq: 421,
  modifyMetaSeq: 422,
  listMetaSeq: 424,
  sagaKey: 'AccountMgt',
  gubun: 'SW',
};

export default AccountMgt;
