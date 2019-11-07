import styled from 'styled-components';

const Styled = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  line-height: normal;
  .board-header__count {
    display: inline-block;
    padding: 0px 15px;
    background: #fff;
    color: #7a59ad;
    font-size: 12px;
    border-radius: 15px;
    height: auto;
    vertical-align: middle;
  }
  i:before {
    font-size: 11px;
    color: #fff;
  }
`;

export default Styled;
