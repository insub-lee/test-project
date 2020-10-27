import styled from 'styled-components';
import arrDownImg from '../../images/icon_arr_down.png';
import arrUpImg from '../../images/icon_arr_up.png';

const StyledArrowIcon = styled.span`
  &.icon_arrow {
    text-indent: -9999px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 5px;
    width: 10px;
    height: 8px;
    background: url(${arrDownImg}) no-repeat center;

    &.on {
      background: url(${arrUpImg}) no-repeat center;
    }
  }
`;

export default StyledArrowIcon;
