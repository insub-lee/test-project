import React from 'react';
import { Button } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const ModalView = ({ viewType, workSeq, taskSeq, closeBtnFunc }) => (
  <BizBuilderBase sagaKey="SearchView" viewType={viewType} workSeq={workSeq} taskSeq={taskSeq} />
);

export default ModalView;
