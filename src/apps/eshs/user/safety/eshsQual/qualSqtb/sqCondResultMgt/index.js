import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomViewPage from './pages/CustomView';

import EquipInputPage from '../sqtbEquipMgt';

class sqCondResultMgt extends Component {
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
          FieldCustomInputPage={EquipInputPage}
          CustomViewPage={CustomViewPage}
          workSeq={5561}
          viewMetaSeq={6601}
          viewType="VIEW"
          loadingComplete={this.loadingComplete}
        />
      </>
    );
  }
}

sqCondResultMgt.defaultProps = {
  sagaKey: 'sqCondResultMgt',
};

export default sqCondResultMgt;
