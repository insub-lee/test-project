import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Options = Select.Option;

export default class CustomSelectBox extends Component {
  constructor(props) {
    super(props);
    console.log('malang.model', props);
    this.state = {
      // modelList: props.values,
    };
  }

  handleModelChange = (event) => {
    const {
      rowIndex,
      agGridReact,
      column,
      node,
    } = this.props;
    const strArry = event.split(',');
    const code = strArry[0];
    const name = strArry[1];

    const param = {
      event,
      rowIndex,
      column,
      node,
      code,
      name,
    };
    agGridReact.props.customSelectBoxReturn(param);
  };

  render() {
    const { values } = this.props;

    return (
      <div>
        <Select
          defaultValue="Select 하세요."
          // value={fab}
          onChange={this.handleModelChange}
          notFoundContent="Select 하세요."
          placeholder="Select 하세요."
          defaultActiveFirstOption={false}
        >
          { values.map(selectKey => <Options key={selectKey.CODE} value={`${selectKey.CODE},${selectKey.NAME}`}>{selectKey.NAME}</Options>) }
        </Select>
        {/* {values} */}
      </div>
    );
  }
}

CustomSelectBox.propTypes = {
  values: PropTypes.array.isRequired,
  agGridReact: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
};
