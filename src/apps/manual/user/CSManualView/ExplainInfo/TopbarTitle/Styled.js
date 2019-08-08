import styled from 'styled-components';

const Styled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    font-size: 13px;
    display: inline-block;
    margin-right: 10px;
    dl {
      margin: 0;
      dt {
        color: #666666;
        display: inline-block;
      }
      dd {
        color: #000;
        display: inline-block;
        margin: 0;
        font-weight: 600;
      }
    }
  }
`;

export default Styled;
