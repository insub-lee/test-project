import React, { PureComponent } from 'react';
import SearchContent from './searchContent';

export default class searchButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      targetName: '',
      valueData: this.props,
      paramValue: this.props.values,
      searchGubun: false,
    };
  }

  getValue() {
    const {targetName} = this.state;
    this.setState({
      searchGubun: false,
    });
    return targetName;
  }
  
  // isPopup() {
  //   return true;
  // }

  handleGetName = (targetName) => {
    this.setState({
      targetName: targetName,
    });
  }

  handleSearchGubun = (value) => {
    this.setState({
      searchGubun: value,
    });
  }
  // changeAutoClick = () => {
  //   this.setState({
  //     paramValue: '유형/현상',
  //   });
  // }

  render() {
    const { valueData, paramValue, searchGubun } = this.state;
    return (
      <span>
        <SearchContent
          valueData={valueData}
          paramValue={paramValue}
          handleGetName={this.handleGetName}
          handleSearchGubun={this.handleSearchGubun}
          searchGubun={searchGubun}
          // changeAutoClick={this.changeAutoClick}
        />
      </span>
    );
  }
}
