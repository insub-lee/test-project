import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

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
        <BizBuilderBase sagaKey={sagaKey} workSeq={6821} viewType="INPUT" loadingComplete={this.loadingComplete} />
      </>
    );
  }
}

ConfirmRequest.defaultProps = {
  sagaKey: 'ConfirmRequest',
};

export default ConfirmRequest;
