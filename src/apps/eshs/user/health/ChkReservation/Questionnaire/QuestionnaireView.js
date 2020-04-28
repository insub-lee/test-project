import React, { Component } from 'react';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class QuestionnaireView extends Component {
  render() {
    return (
      <>
        <StyledContentsWrapper>
          <h1>여기다가 문진표 작성</h1>
        </StyledContentsWrapper>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary">저장</StyledButton>
        </StyledButtonWrapper>
      </>
    )
  }
}

export default QuestionnaireView;