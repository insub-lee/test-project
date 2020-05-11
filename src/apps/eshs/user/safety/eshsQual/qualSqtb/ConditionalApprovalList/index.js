import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

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
        <BizBuilderBase sagaKey={sagaKey} workSeq={5561} listMetaSeq={6801} viewType="LIST" loadingComplete={this.loadingComplete} />
      </>
    );
  }
}

ConditionalApprovalList.defaultProps = {
  sagaKey: 'ConditionalApprovalList',
};

export default ConditionalApprovalList;
