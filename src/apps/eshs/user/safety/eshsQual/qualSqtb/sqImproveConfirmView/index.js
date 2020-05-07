import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomViewPage from './pages/CustomView';

import EquipInputPage from '../sqtbEquipMgt';

class SqImproveConfirmView extends Component {
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
          FieldCustomInputPage={EquipInputPage}
          CustomViewPage={CustomViewPage}
          workSeq={5561}
          viewMetaSeq={6381}
          taskSeq={taskSeq || -1}
          viewType="VIEW"
          loadingComplete={this.loadingComplete}
        />
      </>
    );
  }
}

SqImproveConfirmView.defaultProps = {
  sagaKey: 'SqImproveConfirmView',
  taskSeq: -1,
};

export default SqImproveConfirmView;
