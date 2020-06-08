import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function Search() {
  return (
    <StyledButton className="btn-primary btn-first" onClick={() => {}}>
      Search
    </StyledButton>
  );
}

Search.defaultProps = {};

Search.propTypes = {};
