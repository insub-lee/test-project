import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { Button } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

// 빌더 커스텀 버튼
const InputCustomButtons = props => {
  const { saveBeforeProcess, sagaKey: id, saveTask } = props;
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      <StyledButton className="btn-primary btn-sm mr5" onClick={() => saveBeforeProcess(id, id, saveTask)}>
        저장
      </StyledButton>
    </StyledButtonWrapper>
  );
};

/*
    소개 - 조직도 등록
*/

const organizationChart = () => <BizBuilderBase sagaKey="organizationChart_input" viewType="INPUT" workSeq={15501} InputCustomButtons={InputCustomButtons} />;

export default organizationChart;
