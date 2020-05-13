import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

class ImproveConfrimView extends Component {
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
          modifyMetaSeq={6843}
          viewType="VIEW"
          loadingComplete={this.loadingComplete}
          ViewCustomButtons={() => null}
        />
      </>
    );
  }
}

ImproveConfrimView.defaultProps = {
  sagaKey: 'ImproveConfrimView',
};

export default ImproveConfrimView;
