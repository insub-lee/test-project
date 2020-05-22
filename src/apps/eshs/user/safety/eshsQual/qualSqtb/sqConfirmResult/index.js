import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

import EquipInputPage from '../sqtbEquipMgt';
import CustomModifyPage from './pages/CustomModify';
class sqConfirmResult extends Component {
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

  customOnRowClick = selectedRowData => {
    // console.debug('...............', selectedRowData);
  };

  render() {
    const { sagaKey, taskSeq } = this.props;
    return (
      <>
        <BizBuilderBase
          sagaKey={sagaKey}
          FieldCustomInputPage={EquipInputPage}
          CustomModifyPage={CustomModifyPage}
          workSeq={5561}
          taskSeq={taskSeq}
          viewType="MODIFY"
          modifyMetaSeq={5761}
          loadingComplete={this.loadingComplete}
          customOnRowClick={record => this.customOnRowClick(record)}
        />
      </>
    );
  }
}

sqConfirmResult.defaultProps = {
  sagaKey: 'sqConfirmResult',
  taskSeq: -1,
};

export default sqConfirmResult;
