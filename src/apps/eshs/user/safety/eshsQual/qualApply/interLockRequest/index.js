import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomInput from 'apps/eshs/user/safety/eshsQual/qualApply/interLockRequest/pages/CustomInput';
import CustomModify from 'apps/eshs/user/safety/eshsQual/qualApply/interLockRequest/pages/CustomModify';

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
    const { sagaKey, taskSeq, viewType } = this.props;
    return (
      <>
        <BizBuilderBase
          CustomInputPage={CustomInput}
          CustomModifyPage={CustomModify}
          sagaKey={sagaKey}
          workSeq={6821}
          taskSeq={taskSeq}
          inputMetaSeq={7421}
          modifyMetaSeq={7501}
          viewType={viewType}
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
  taskSeq: -1,
  viewType: 'INPUT',
};

export default InterLockRequest;
