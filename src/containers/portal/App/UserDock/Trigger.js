import styled from 'styled-components';

const Trigger = styled.span`
  display: inline-block;
  float: left;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
`;

export default Trigger;
