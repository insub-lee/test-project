import styled from 'styled-components';

const Styled = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
  & li {
    position: relative;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 0.3rem;
    color: #666666;
    font-size: 11px;
    &:before {
      display: inline-block;
      padding-right: 0.3rem;
      color: inherit;
      content: '/';
    }
    &.home {
      &:before {
        display: none;
      }
      & i {
        padding-right: 0.3rem;
      }
    }
    &.here {
      color: #000;
    }
  }
`;

export default Styled;
