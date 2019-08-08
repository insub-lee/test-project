import styled from 'styled-components';

const Styled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: normal;
  & li {
    position: relative;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 0.2rem;
    color: #666666;
    font-size: 11px;
    &:before {
      display: inline-block;
      padding-right: 0.2rem;
      color: inherit;
      content: '/';
    }
    &.home {
      &:before {
        display: none;
      }
      & i {
        padding-right: 0.2rem;
      }
    }
    &.here {
      color: #000;
    }
  }
`;

export default Styled;
