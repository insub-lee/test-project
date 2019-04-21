import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SpCountTextReaderer extends Component {
  constructor(props) {
    super(props);
    console.log('malang.model', props);
    this.state = {
      e: props,
    };
  }
  spCountTextClick = () => {
    console.log('malang..test01');
    this.props.agGridReact.props.SpCountTextReturn(this.state.e);
  }
  render() {
    const {value} = this.props
    return (
      <div>
        {value !== '' ?
          <span
            onClick={this.spCountTextClick}
            onKeyPress={this.spCountTextClick}
            role="presentation"
            style={{ fontWeight: 'bold', fontSize: '13px', color: 'blue', cursor: 'pointer' }}
          >
            {value}
          </span>
          :
          <span
            style={{ cursor: 'pointer'}}
          >
            HyPM명을 입력해주세요.
          </span>
        }
      </div>
    );
  }
}

SpCountTextReaderer.propTypes = {
  value: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  agGridReact: PropTypes.object.isRequired,
  // values: PropTypes.array.isRequired,
  // rowIndex: PropTypes.number.isRequired,
  // column: PropTypes.object.isRequired,
  // node: PropTypes.object.isRequired,
};
