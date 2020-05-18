import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

class ApplyList extends Component {
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
          workSeq={6821}
          listMetaSeq={8041}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={() => null}
          ModifyCustomButtons={() => null}
        />
      </>
    );
  }
}

ApplyList.defaultProps = {
  sagaKey: 'ApplyList',
};

export default ApplyList;
