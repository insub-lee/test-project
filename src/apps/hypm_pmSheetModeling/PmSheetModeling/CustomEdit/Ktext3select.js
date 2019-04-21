import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Options = Select.Option;

export default class Ktext3select extends Component {
  constructor(props) {
    super(props);
    console.log('malang.TxtSelect', props);
    this.state = {
      KTEXT3: '',
    };
  }

  componentWillMount() {
    this.setState({
      KTEXT3: this.props.value
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
    const text = strArry[1];

    await this.setState({
      KTEXT3: text,
    });

    const rowNode = api.getRowNode(node.id);
    rowNode.setDataValue('STRAT', code);

    api.stopEditing();
    this.onBtStartEditing(rowIndex, 'KTEXT3', null);
  };

  getValue(){
    return this.state.KTEXT3;
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
          defaultValue={value !== '' && value !== undefined ? `${node.data.STRAT},${node.data.KTEXT3}` : 'Select 하세요.'}
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

Ktext3select.propTypes = {
  values: PropTypes.array.isRequired,
  // agGridReact: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};
