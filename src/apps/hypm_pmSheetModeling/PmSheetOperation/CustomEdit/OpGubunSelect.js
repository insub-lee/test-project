import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Options = Select.Option;

export default class OpGubunSelect extends Component {
  constructor(props) {
    super(props);
    console.log('malang.OP_GUBUN', props);
    console.log('this.props.value', this.props.value);
    this.state = {
      OP_GUBUN: '',
    };
  }

  componentWillMount() {
    this.setState({
      OP_GUBUN: this.props.value
    })
    console.log('this.state.OP_GUBUN: ', this.state.OP_GUBUN);
  }

  handleSelectChange = async(event) => {
    const {
      node,
      rowIndex,
      api,
    } = this.props;
    const strArry = event.split(',');
    const code = strArry[0];
    const text = strArry[1];
    console.log('code111111111111111111111111: ', code);
    await this.setState({
      OP_GUBUN: text,
    });

    const rowNode = api.getRowNode(node.id);
    rowNode.setDataValue('OP_GUBUN', code);

    api.stopEditing();
    this.onBtStartEditing(rowIndex, 'OP_GUBUN', null);
  };

  getValue(){
    return this.state.OP_GUBUN;
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
          defaultValue={value !== '' && value !== undefined ? `${node.data.OP_GUBUN}` : 'Select 하세요.'}
          // value={fab}
          onChange={this.handleSelectChange}
          notFoundContent="Select 하세요."
          placeholder="Select 하세요."
          defaultActiveFirstOption={false}
        >
          { values.map(selectKey => <Options key={selectKey.CODE} value={`${selectKey.CODE},${selectKey.TEXT}`}>{selectKey.TEXT}</Options>) }
        </Select>
        {/* {values} */}
      </div>
    );
  }
}

OpGubunSelect.propTypes = {
  values: PropTypes.array.isRequired,
  // agGridReact: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};
