import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomModifyPage from './pages/CustomModify';

import EquipInputPage from '../sqtbEquipMgt';

class SqImproveResult extends Component {
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
          CustomModifyPage={CustomModifyPage}
          workSeq={5561}
          modifyMetaSeq={6361}
          viewType="MODIFY"
          loadingComplete={this.loadingComplete}
        />
      </>
    );
  }
}

SqImproveResult.defaultProps = {
  sagaKey: 'SqImproveResult',
};

export default SqImproveResult;
