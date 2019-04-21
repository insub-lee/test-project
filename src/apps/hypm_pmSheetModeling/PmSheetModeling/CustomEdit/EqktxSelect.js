import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Options = Select.Option;

export default class EqktxSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EQKTX: '',
    };
  }

  componentWillMount() {
    this.setState({
      EQKTX: this.props.value
    })
  }

  handleSelectChange = async(event) => {
    const {
      node,
      rowIndex,
      api,
    } = this.props;
    const strArry = event.split(',');
    const code = strArry[0];
    const name = strArry[1];

    await this.setState({
      EQKTX: name,
    });

    const rowNode = api.getRowNode(node.id);
    rowNode.setDataValue('PLNNR', code);

    api.stopEditing();
    this.onBtStartEditing(rowIndex, 'EQKTX', null);
  };

  getValue(){
    return this.state.EQKTX;
  }

  onBtStartEditing = (key, char, pinned) =>  {

    this.props.api.setFocusedCell(key, char, pinned);
    this.props.api.startEditingCell({
      rowIndex: key,
      colKey: char,
    });
  } 

  render() {
    const { values, node, value } = this.props;

    return (
      <div>
        <Select
          defaultValue={value !== '' && value !== undefined ? `${node.data.PLNNR},${node.data.EQKTX}` : 'Select 하세요.'}
          // value={fab}
          onChange={this.handleSelectChange}
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

EqktxSelect.propTypes = {
  values: PropTypes.array.isRequired,
  // agGridReact: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};
