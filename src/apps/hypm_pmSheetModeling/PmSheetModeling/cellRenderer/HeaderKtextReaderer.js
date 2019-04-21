import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderKtextReaderer extends Component {
  constructor(props) {
    super(props);
    console.log('malang.model', props);
    this.state = {
      // modelList: props.values,
      e: props,
    };
  }
  headerKtextClick = () => {
    console.log('malang..test01');
    this.props.agGridReact.props.HeaderKtextReturn(this.state.e);
  }
  render() {
    const {value} = this.props
    return (
      <div>
        {value !== '' ?
          <span
            onClick={this.headerKtextClick}
            onKeyPress={this.headerKtextClick}
            role="presentation"
            style={{ fontWeight: 'bold', fontSize: '13px', color: 'blue', cursor: 'pointer'}}
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

HeaderKtextReaderer.propTypes = {
  value: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  agGridReact: PropTypes.object.isRequired,
  // values: PropTypes.array.isRequired,
  // rowIndex: PropTypes.number.isRequired,
  // column: PropTypes.object.isRequired,
  // node: PropTypes.object.isRequired,  
};
