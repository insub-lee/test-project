import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Options = Select.Option;

export default class TxtSelect extends Component {
  constructor(props) {
    super(props);
    console.log('malang.TxtSelect', props);
    this.state = {
      TXT: '',
    };
  }

  componentWillMount() {
    this.setState({
      TXT: this.props.value
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
      TXT: text,
    });

    const rowNode = api.getRowNode(node.id);
    rowNode.setDataValue('VERWE', code);
    api.stopEditing();
    this.onBtStartEditing(rowIndex, 'TXT', null, code, node.data.ROW_TYPE);
  };

  getValue = () => {
    return this.state.TXT;
  }

  onBtStartEditing = (key, char, pinned, code, rowType) =>  {

    const columnDefsTamp = this.props.columnApi.columnController.columnDefs.slice();
    if (code === 'F1' && rowType === 'ADD') {
      columnDefsTamp[9].editable = true;
      this.props.api.setColumnDefs(columnDefsTamp);
    } else {
      columnDefsTamp[9].editable = false;
      this.props.api.setColumnDefs(columnDefsTamp);
    }


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
          defaultValue={value !== '' && value !== undefined ? `${node.data.VERWE},${node.data.TXT}` : 'Select 하세요.'}
          // value={fab}
          onChange={this.handleSelectChange}
          notFoundContent="Select 하세요."
          placeholder="Select 하세요."
          defaultActiveFirstOption={false}
        >
          { values.map(selectKey => <Options key={selectKey.CODE} value={`${selectKey.CODE},${selectKey.TEXT}`}>{selectKey.TEXT}</Options>) }
        </Select>
      </div>
    );
  }
}

TxtSelect.propTypes = {
  values: PropTypes.array.isRequired,
  // agGridReact: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  api: PropTypes.object.isRequired,
};
