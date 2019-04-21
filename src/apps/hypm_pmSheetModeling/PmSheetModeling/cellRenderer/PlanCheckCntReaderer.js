import React, { Component } from 'react';
import PropTypes from 'prop-types';
import planIcon from 'apps/hypm_common/css/image/icon/planCheckCntIcon.png'

export default class PlanCheckCntReaderer extends Component {
  constructor(props) {
    super(props);
    console.log('malang.model', props);
    this.state = {
      // modelList: props.values,
      e: props,
    };
  }
  planCheckCntClick = () => {
    console.log('malang..test01');
    this.props.agGridReact.props.HeaderKtextReturn(this.state.e);
  }
  render() {
    const {value} = this.props
    return (
      <div>
        {value !== undefined && value !== '' ?
          <span
            onClick={this.planCheckCntClick}
            onKeyPress={this.planCheckCntClick}
            role="presentation"            
          >
            <img src={planIcon} alt="" style={{ cursor: 'pointer' }} />
          </span> : ''
        }
      </div>
    );
  }
}

PlanCheckCntReaderer.propTypes = {
  value: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  agGridReact: PropTypes.object.isRequired,
  // values: PropTypes.array.isRequired,
  // rowIndex: PropTypes.number.isRequired,
  // column: PropTypes.object.isRequired,
  // node: PropTypes.object.isRequired,  
};
