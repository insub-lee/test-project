import styled from 'styled-components';
import iconSelect from '../../../images/icon_select.png';

const StyledSelect = styled.div`
  & select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 0;
    width: 100%;
    //width: calc(100% - 30px);
    color: #555;
    vertical-align: middle;
    border-bottom: 0px solid #d9e0e7;
    font-size: 15px;
    height: 49px;
    line-height: 49px;
    background: #e7e7e7 url(${iconSelect}) no-repeat right 10px center;
    padding: 0 10px;
    /* TextField와 맞추기 위해 주석처리 */
    /* text-indent: 10px; */
  }
  .noactive {
    background: white url('') no-repeat right center;
  }
`;

export default StyledSelect;
