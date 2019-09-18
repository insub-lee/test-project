import styled from 'styled-components';

const Styled = styled.div`
  .react-tabs__tab--selected input {
    background-color: #fff !important;
  }
  .react-tabs__tab input {
    background-color: #eff0f2;
    display: inherit;
    width: 93%;
    border: none;
    padding: 0;
    line-height: normal;
    height: 22px;
    & {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export default Styled;
