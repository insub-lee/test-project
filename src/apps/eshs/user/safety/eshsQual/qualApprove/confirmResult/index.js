import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomModify from 'apps/eshs/user/safety/eshsQual/qualApprove/confirmResult/pages/CustomModify';

class ConfirmResult extends Component {
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
          taskSeq={taskSeq}
          modifyMetaSeq={7041}
          viewType="MODIFY"
          CustomModifyPage={CustomModify}
          loadingComplete={this.loadingComplete}
          ModifyCustomButtons={() => null}
        />
      </>
    );
  }
}

ConfirmResult.defaultProps = {
  sagaKey: 'ConfirmResult',
  taskSeq: -1,
};

export default ConfirmResult;
