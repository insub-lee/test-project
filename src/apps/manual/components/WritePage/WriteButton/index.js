import React from 'react';

import { Icon } from 'antd';

import Button from '../../../../../components/Button/StyledButton';
import Styled from './Styled';

const WriteButton = () => (
  <Styled className="write-btn-wrap">
    <Button type="button" className="btn-sm btn-primary">
      <Icon type="fullscreen" />
    </Button>
    <Button type="button" className="btn-sm btn-primary">
      <Icon type="delete" />
    </Button>
  </Styled>
);

export default WriteButton;
