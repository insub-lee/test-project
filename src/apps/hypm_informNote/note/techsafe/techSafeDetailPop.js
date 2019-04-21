import React, { PureComponent } from 'react';

export default class techSafeDetailPop extends PureComponent {
  constructor(props) {
    super(props);
  }

  techSafePop = () => {
    const { value } = this.props;
    window.open(`/sm/informNote/pop/InformNoteTechSafeDetail/${value}`, 'utilityInformNoteDetailForm', 'width=1200,height=800');
  }

  render() {
    return (
      <span
        onClick={this.techSafePop}
        style={{color: 'blue', cursor: 'pointer'}}
      >
        {this.props.value}
      </span>
    );
  }
}
