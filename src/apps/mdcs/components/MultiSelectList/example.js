import React, { Component } from 'react';
import { fromJS } from 'immutable';
import MultiSelectList from './index';
class MultiSelectListTest extends Component {
  state = {
    isClear: false,
  };

  onParentSelect = selectedItems => {
    console.debug(selectedItems);
  };

  onRemove = (rmItem, selectedItems) => {
    console.debug(rmItem, selectedItems);
  };

  render() {
    const selectedItems = [{ key: 'Site', value: '3', text: 'Seoul' }, { key: 'key2', value: 'F3', text: 'F3' }];

    return (
      <div>
        <MultiSelectList allClear={this.state.isClear} onChange={this.onParentSelect} onRemove={this.onRemove} selectedItems={selectedItems}></MultiSelectList>
      </div>
    );
  }
}
export default MultiSelectListTest;
