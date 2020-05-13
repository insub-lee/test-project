import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomInput from 'apps/eshs/user/safety/eshsQual/qualApply/confirmRequest/pages/CustomInput';
import CustomModify from 'apps/eshs/user/safety/eshsQual/qualApply/confirmRequest/pages/CustomModify';

class ConfirmRequest extends Component {
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

  render() {
    const { sagaKey } = this.props;
    return (
      <>
        <BizBuilderBase
          CustomInputPage={CustomInput}
          CustomModifyPage={CustomModify}
          sagaKey={sagaKey}
          workSeq={6821}
          viewType="INPUT"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={() => null}
          ModifyCustomButtons={() => null}
        />
      </>
    );
  }
}

ConfirmRequest.defaultProps = {
  sagaKey: 'ConfirmRequest',
};

export default ConfirmRequest;
