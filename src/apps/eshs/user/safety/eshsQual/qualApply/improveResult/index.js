import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

import CustomModify from 'apps/eshs/user/safety/eshsQual/qualApply/improveResult/pages/CustomModify';

class ImproveResult extends Component {
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
          sagaKey={sagaKey}
          CustomModifyPage={CustomModify}
          workSeq={6821}
          modifyMetaSeq={7161}
          viewType="MODIFY"
          loadingComplete={this.loadingComplete}
          ModifyCustomButtons={() => null}
        />
      </>
    );
  }
}

ImproveResult.defaultProps = {
  sagaKey: 'ImproveResult',
};

export default ImproveResult;
