import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import { withPropsAPI } from 'gg-editor';
import { Icon } from 'antd';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

class EditorActionPanel extends Component {
  // componentDidMount() {
  //   const { propsAPI } = this.props;

  //   console.log('propsAPI: ', propsAPI);
  // }

  // isValid = data => {
  //   console.log('isValid data : ', data);
  //   const { nodes, edges } = data;
  //   /*
  //     1) 추가된 node, edges가 없을 때,
  //   */
  //   if (!nodes || !edges) return false;
  //   /*
  //     2) nodes에 step 선택 여부 체크
  //   */
  //   const idx = _.findIndex(nodes, n => !n.step);
  //   console.log('idx : ', idx);
  //   if (idx > -1) return false;

  //   return true;
  // };

  onClickSave = () => {
    const { sagaKey: id, propsAPI, onflowChartSave } = this.props;
    const { save } = propsAPI;
    const data = save && save();
    const result = {
      DESIGN_DATA: data,
    };
    console.debug('sagaKey', id);
    onflowChartSave(id, result);
  };

  // read = () => {
  //   const { propsAPI } = this.props;
  //   const { data } = this.state;
  //   console.log('data : ', data);
  //   propsAPI.read(data);
  // };

  render() {
    return (
      <StyledButtonWrapper>
        <StyledButton className="btn-primary" onClick={this.onClickSave}>
          <Icon type="save" />
          저장
        </StyledButton>
      </StyledButtonWrapper>
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
