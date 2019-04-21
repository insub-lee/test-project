import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// eslint-disable-next-line react/prefer-stateless-function
export default class CellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    /* eslint arrow-body-style: ["error", "always"] */
    const RenderSettingView = (item) => {
      const { onClickSheet } = item.agGridReact.props;
      return (
        <div>
          <button style={{ background: 'transparent' }} onClick={() => onClickSheet(item.value, item.data.STATUS_TX, item.data.U_ID, item.data.STATUS)}>{item.value}</button>
        </div>
      );
    };

    return (
      <div>
        {RenderSettingView(this.props)}
      </div>
    );
  }
}

CellRenderer.propTypes = {
//   value: PropTypes.string.isRequired,
//   onClickSheet: PropTypes.func.isRequired,
};
