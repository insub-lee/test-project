import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  width: 100%;

  .searchInput {
    width: 375px;
    & > .ant-input-search > input {
      border-color: #e5e5e5;
      &::placeholder {
        color: #869099;
      }
    }
  }
`;

export default Styled;
