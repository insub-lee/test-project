import styled from 'styled-components';

const StyledTextarea = Component => styled(Component)`
  &.ant-input {
    display: block;
    width: 100%;
    height: auto;
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.47;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    &:hover,
    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #886ab5;
      outline: 0;
      box-shadow: 0 0 0 0.2rem transparent;
    }
  }
`;

export default StyledTextarea;
