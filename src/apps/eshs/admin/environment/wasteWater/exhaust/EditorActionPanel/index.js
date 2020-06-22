import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withPropsAPI } from 'gg-editor';
import { Icon } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class EditorActionPanel extends Component {
  onClickSave = () => {
    const { sagaKey: id, propsAPI, onflowChartSave } = this.props;
    const { save } = propsAPI;
    const data = save && save();
    const result = {
      DESIGN_DATA: data,
    };
    onflowChartSave(id, result);
  };

  render() {
    return (
      <StyledButton className="btn-primary btn-sm" onClick={this.onClickSave}>
        <Icon type="save" />
        저장
      </StyledButton>
    );
  }
}

EditorActionPanel.propTypes = {
  sagaKey: PropTypes.string,
  propsAPI: PropTypes.object,
  onflowChartSave: PropTypes.func,
};

EditorActionPanel.defaultProps = {};

export default withPropsAPI(EditorActionPanel);
