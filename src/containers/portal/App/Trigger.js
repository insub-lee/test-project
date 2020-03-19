import styled from 'styled-components';

const Trigger = styled.span`
  display: block;

  .trigger {
    font-size: 15px;
    cursor: pointer;
    transition: color 0.3s;
    &.icon-menu:before {
      color: #fff;
    }
  }
`;

export default Trigger;
