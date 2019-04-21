import React, { PureComponent } from 'react';
import SafetyContent from './safetyContent'

export default class safetyButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      workNo: '',
    };
  }

  // getValue() {
  //   const {workNo} = this.state;
  //   return workNo;
  // }

  handleMoveData = (workNo) => {
    this.setState({
      workNo: workNo
    });
    this.props.api.stopEditing();
  }

  render() {
    return(
      <SafetyContent handleMoveData={this.handleMoveData} />
    );
  }
}