import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Options = Select.Option;

export default class Ktext1select extends Component {
  constructor(props) {
    super(props);
    console.log('malang.KTEXT1', props);
    console.log('this.props.value', this.props.value);
    this.state = {
      KTEXT1: '',
    };
  }

  componentWillMount() {
    this.setState({
      KTEXT1: this.props.value
    })
    console.log('this.state.KTEXT1: ', this.state.KTEXT1);
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
      KTEXT1: text,
    });

    const rowNode = api.getRowNode(node.id);
    rowNode.setDataValue('KTEX1', code);

    api.stopEditing();
    this.onBtStartEditing(rowIndex, 'KTEX1', null);
  };

  getValue(){
    return this.state.KTEXT1;
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
          defaultValue={value !== '' && value !== undefined ? `${node.data.KTEX1}` : 'Select 하세요.'}
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

Ktext1select.propTypes = {
  values: PropTypes.array.isRequired,
  // agGridReact: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};
