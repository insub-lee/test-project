import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

// changeViewPage: ƒ (id, workSeq, taskSeq, viewType, revisionType)
export default function ModifyBtn(props) {
  return (
    <StyledButton className="btn-primary btn-first btn-sm" onClick={() => props.changeViewPage(props.sagaKey, props.workSeq, props.taskSeq, 'MODIFY')}>
      수정
    </StyledButton>
  );
}

ModifyBtn.defaultProps = {};

ModifyBtn.propTypes = {
  changeViewPage: PropTypes.func,
  sagaKey: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
};
