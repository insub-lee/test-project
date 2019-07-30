import styled from 'styled-components';

const Styled = styled.div`
  & a {
    display: block;
    color: #fff !important;
    font-size: 13px;
    &:before {
      content: '·';
      display: inline-block;
      font-size: 12px;
      color: #fff;
      margin-right: 5px;
    }
  }
`;

export default Styled;
