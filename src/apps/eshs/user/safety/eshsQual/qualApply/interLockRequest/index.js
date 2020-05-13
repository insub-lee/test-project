import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomInput from 'apps/eshs/user/safety/eshsQual/qualApply/confirmRequest/pages/CustomInput';
import CustomModify from 'apps/eshs/user/safety/eshsQual/qualApply/confirmRequest/pages/CustomModify';

class InterLockRequest extends Component {
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
          inputMetaSeq={7421}
          // modifyMetaSeq={7161}
          viewType="INPUT"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={() => null}
          ModifyCustomButtons={() => null}
        />
      </>
    );
  }
}

InterLockRequest.defaultProps = {
  sagaKey: 'InterLockRequest',
};

export default InterLockRequest;
