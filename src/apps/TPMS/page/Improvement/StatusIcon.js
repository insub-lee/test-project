import styled from 'styled-components';
import iconIng1 from '../../images/icon_ing1_on.png';
import iconIng2 from '../../images/icon_ing2_on.png';
import iconIng3 from '../../images/icon_ing3_on.png';
import iconIng4 from '../../images/icon_ing4_on.png';
import iconIng5 from '../../images/icon_ing5_on.png';

const StyledIcon = styled.span`
  &.sky {
    color: #14bfd9 !important;
  }

  &.green {
    color: #38c58e !important;
  }

  &.gold {
    color: #ddb654 !important;
  }

  &.orange {
    color: #eb624c !important;
  }

  &.gray {
    color: #555 !important;
  }

  & > span {
    display: inline-block;
    vertical-align: middle;

    &.icon {
      margin: -3px 5px 0 0;

      &.icon_ing1_on {
        width: 21px;
        height: 19px;
        background: url(${iconIng1}) no-repeat center;
      }

      &.icon_ing2_on {
        width: 21px;
        height: 19px;
        background: url(${iconIng2}) no-repeat center;
      }

      &.icon_ing3_on {
        width: 21px;
        height: 19px;
        background: url(${iconIng3}) no-repeat center;
      }

      &.icon_ing4_on {
        width: 21px;
        height: 19px;
        background: url(${iconIng4}) no-repeat center;
      }

      &.icon_ing5_on {
        width: 21px;
        height: 19px;
        background: url(${iconIng5}) no-repeat center;
      }
    }
  }

  .icon {
    margin: -3px 5px 0 0;
  }
`;

export default StyledIcon;
