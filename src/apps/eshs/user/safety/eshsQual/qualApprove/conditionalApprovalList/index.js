import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from 'apps/eshs/user/safety/eshsQual/qualApprove/conditionalApprovalList/pages/CustomList';
import ConfirmView from 'apps/eshs/user/safety/eshsQual/qualApply/improveConfirmView';
class ConditionalApprovalList extends Component {
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
          CustomListPage={CustomList}
          sagaKey={sagaKey}
          workSeq={6821}
          listMetaSeq={8161}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          ConfirmView={taskSeq => <ConfirmView taskSeq={taskSeq} />}
        />
      </>
    );
  }
}

ConditionalApprovalList.defaultProps = {
  sagaKey: 'ConditionalApprovalList',
};

export default ConditionalApprovalList;
