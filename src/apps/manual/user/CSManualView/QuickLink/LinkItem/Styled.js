import styled from 'styled-components';

const Styled = styled.div`
  & a {
    display: block;
    color: #666 !important;
    font-size: 13px;
    &:before {
      content: '·';
      display: inline-block;
      font-size: 12px;
      color: #666;
      margin-right: 5px;
    }
  }
`;

export default Styled;
