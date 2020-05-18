import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomModify from 'apps/eshs/user/safety/eshsQual/qualApprove/interLockResult/pages/CustomModify';

class InterLockResult extends Component {
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
    const { sagaKey, taskSeq } = this.props;
    return (
      <>
        <BizBuilderBase
          sagaKey={sagaKey}
          workSeq={6821}
          modifyMetaSeq={7581}
          taskSeq={taskSeq}
          CustomModifyPage={CustomModify}
          viewType="MODIFY"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={() => null}
          ModifyCustomButtons={() => null}
        />
      </>
    );
  }
}

InterLockResult.defaultProps = {
  sagaKey: 'InterLockResult',
  taskSeq: -1,
};

export default InterLockResult;
