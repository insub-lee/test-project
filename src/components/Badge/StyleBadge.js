import React from 'react';
import styled from 'styled-components';
import { font } from 'styled-theme';
import { borderRadius, boxShadow } from '../../config/style-util';
import WithDirection from '../../config/withDirection';
import Badges from '../Badge/index';

const AntBadge = props => <Badges {...props} />;

const Badge = styled(AntBadge)`
  display: inline-block;
  position: absolute;
  right: 0;

  &:not(.ant-badge-status) {
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '16px')};
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : '0')};
  }

  .ant-badge-count {
    min-width: 16px;
    max-width: 26px;
    height: 16px;
    font-family: ${font('primary', 0)};
    font-size: 10px;
    line-height: 15px;
    background: #ea002c;
    ${boxShadow('none')};
    ${borderRadius('7.5px')};

    // &.ant-badge-multiple-words {
    //   padding: 0 5px;
    // }
  }
  
  .ant-badge-status-text {
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '8px')};
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? '8px' : 'inherit')};
  }
`;

export default WithDirection(Badge);
