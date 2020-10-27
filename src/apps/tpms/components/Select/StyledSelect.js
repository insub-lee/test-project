import styled from 'styled-components';
import iconSelect from '../../images/icon_select.png';

const StyledSelect = styled.div`
  & select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 0;
    width: 100%;
    color: #555;
    vertical-align: middle;
    border-bottom: 1px solid #d9e0e7;
    font-size: 15px;
    height: 48px;
    line-height: 48px;
    background: white url(${iconSelect}) no-repeat right center;
    /* TextField와 맞추기 위해 주석처리 */
    /* text-indent: 10px; */
  }
`;

export default StyledSelect;
